import { salesforceConfig } from '../config/salesforce.js';

class SalesforceService {
  constructor() {
    this.accessToken = null;
    this.instanceUrl = null;
    this.tokenExpiresAt = null;
  }

  /**
   * Obtain fresh Salesforce access token using Client Credentials (client_id & client_secret)
   */
  async getAccessToken(forceRefresh = false) {
    if (
      !forceRefresh &&
      this.accessToken &&
      this.instanceUrl &&
      (!this.tokenExpiresAt || Date.now() < this.tokenExpiresAt)
    ) {
      return { accessToken: this.accessToken, instanceUrl: this.instanceUrl };
    }

    const { loginUrl, clientId, clientSecret, username, password } = salesforceConfig;
    const tokenUrl = `${loginUrl.replace(/\/+$/, '')}/services/oauth2/token`;

    if (!clientId || !clientSecret) {
      throw new Error('Salesforce clientId or clientSecret missing in configuration');
    }

    // 1. Primary: Direct Client Credentials Flow using client_id and client_secret
    try {
      const ccParams = new URLSearchParams();
      ccParams.append('grant_type', 'client_credentials');
      ccParams.append('client_id', clientId);
      ccParams.append('client_secret', clientSecret);

      const ccRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: ccParams.toString(),
      });

      const ccData = await ccRes.json();

      if (ccRes.ok && ccData.access_token) {
        this.accessToken = ccData.access_token;
        this.instanceUrl = ccData.instance_url || salesforceConfig.loginUrl;
        this.tokenExpiresAt = Date.now() + 110 * 60 * 1000;
        return { accessToken: this.accessToken, instanceUrl: this.instanceUrl };
      }

      // If client credentials flow returns error and username/password is configured, fallback
      if (username && password) {
        const pParams = new URLSearchParams();
        pParams.append('grant_type', 'password');
        pParams.append('client_id', clientId);
        pParams.append('client_secret', clientSecret);
        pParams.append('username', username);
        pParams.append('password', password);

        const pRes = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: pParams.toString(),
        });

        const pData = await pRes.json();

        if (pRes.ok && pData.access_token) {
          this.accessToken = pData.access_token;
          this.instanceUrl = pData.instance_url || salesforceConfig.loginUrl;
          this.tokenExpiresAt = Date.now() + 110 * 60 * 1000;
          return { accessToken: this.accessToken, instanceUrl: this.instanceUrl };
        }

        const errorDesc = pData.error_description || pData.error || pRes.statusText;
        throw new Error(`Salesforce Authentication Failed (${pRes.status}): ${errorDesc}`);
      }

      const ccError = ccData.error_description || ccData.error || ccRes.statusText;
      throw new Error(`Salesforce Authentication Failed (${ccRes.status}): ${ccError}`);
    } catch (error) {
      console.error('❌ Salesforce Token Retrieval Error:', error.message);
      throw error;
    }
  }

  /**
   * Helper to execute authenticated requests to Salesforce REST API.
   */
  async request(endpoint, options = {}, isRetry = false) {
    const { accessToken, instanceUrl } = await this.getAccessToken(isRetry);
    const apiVersion = salesforceConfig.apiVersion.replace(/^v?/, 'v');
    const url = `${instanceUrl}/services/data/${apiVersion}${endpoint}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    };

    const fetchOptions = { ...options, headers };
    if (options.body && typeof options.body === 'object') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (response.status === 401 && !isRetry) {
        console.warn('⚠️ Salesforce Access Token expired, attempting refresh...');
        this.accessToken = null;
        return await this.request(endpoint, options, true);
      }

      if (response.status === 204) {
        return { success: true };
      }

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        let errorMessage = `Salesforce API Error (${response.status})`;
        if (Array.isArray(data) && data[0]?.message) {
          errorMessage = `${data[0].message} (${data[0].errorCode || ''})`;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        error.salesforceData = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`❌ Salesforce Request Failed [${options.method || 'GET'} ${endpoint}]:`, error.message);
      throw error;
    }
  }

  async query(soql) {
    const encoded = encodeURIComponent(soql);
    const result = await this.request(`/query?q=${encoded}`);
    return result.records || [];
  }

  async getRecord(sobject, id, fields = []) {
    let endpoint = `/sobjects/${sobject}/${id}`;
    if (fields.length > 0) {
      endpoint += `?fields=${fields.join(',')}`;
    }
    return await this.request(endpoint);
  }

  async createRecord(sobject, data) {
    const result = await this.request(`/sobjects/${sobject}`, {
      method: 'POST',
      body: data,
    });
    return { id: result.id, success: result.success };
  }

  async updateRecord(sobject, id, data) {
    await this.request(`/sobjects/${sobject}/${id}`, {
      method: 'PATCH',
      body: data,
    });
    return { id, success: true };
  }

  async deleteRecord(sobject, id) {
    await this.request(`/sobjects/${sobject}/${id}`, {
      method: 'DELETE',
    });
    return { id, success: true, message: 'Record deleted successfully' };
  }

  async testConnection() {
    try {
      const { instanceUrl } = await this.getAccessToken();
      const testResult = await this.query('SELECT Id FROM Organization LIMIT 1');
      return {
        connected: true,
        instanceUrl,
        orgId: testResult[0]?.Id || 'Connected',
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message,
      };
    }
  }
}

const salesforceService = new SalesforceService();
export default salesforceService;
