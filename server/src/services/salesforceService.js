import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { salesforceConfig } from '../config/salesforce.js';

class SalesforceService {
  constructor() {
    this.accessToken = salesforceConfig.accessToken || null;
    this.instanceUrl = salesforceConfig.instanceUrl || null;
    this.refreshToken = process.env.SALESFORCE_REFRESH_TOKEN || null;
    this.tokenExpiresAt = null;
    this.codeVerifier = null;
  }

  /**
   * Generates the 1-click Salesforce OAuth Login URL with PKCE.
   */
  getAuthorizeUrl(redirectUri = 'http://localhost:5000/api/auth/salesforce/callback') {
    const { loginUrl, clientId } = salesforceConfig;
    const base = loginUrl.replace(/\/+$/, '');
    const encodedRedirect = encodeURIComponent(redirectUri);

    // Generate PKCE code_verifier and code_challenge
    this.codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto.createHash('sha256').update(this.codeVerifier).digest('base64url');

    return `${base}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodedRedirect}&scope=api%20refresh_token%20full%20offline_access&prompt=consent&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  }

  /**
   * Exchanges an OAuth Authorization Code for an Access Token & Refresh Token using PKCE.
   */
  async handleCallback(code, redirectUri = 'http://localhost:5000/api/auth/salesforce/callback') {
    const { loginUrl, clientId, clientSecret } = salesforceConfig;
    const tokenUrl = `${loginUrl.replace(/\/+$/, '')}/services/oauth2/token`;

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('redirect_uri', redirectUri);
    params.append('code', code);
    if (this.codeVerifier) {
      params.append('code_verifier', this.codeVerifier);
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`OAuth Callback Failed (${response.status}): ${data.error_description || data.error}`);
    }

    this.accessToken = data.access_token;
    this.instanceUrl = data.instance_url;
    this.refreshToken = data.refresh_token || this.refreshToken;
    this.tokenExpiresAt = Date.now() + 110 * 60 * 1000;

    if (data.refresh_token) {
      this.saveRefreshToken(data.refresh_token);
    }

    return {
      connected: true,
      instanceUrl: this.instanceUrl,
      hasRefreshToken: !!this.refreshToken,
    };
  }

  saveRefreshToken(token) {
    try {
      const serverEnvPath = path.resolve(process.cwd(), '.env');
      const rootEnvPath = path.resolve(process.cwd(), '..', '.env');
      [serverEnvPath, rootEnvPath].forEach((envPath) => {
        if (fs.existsSync(envPath)) {
          let envContent = fs.readFileSync(envPath, 'utf8');
          if (envContent.includes('SALESFORCE_REFRESH_TOKEN=')) {
            envContent = envContent.replace(/SALESFORCE_REFRESH_TOKEN=.*/g, `SALESFORCE_REFRESH_TOKEN=${token}`);
          } else {
            envContent += `\nSALESFORCE_REFRESH_TOKEN=${token}\n`;
          }
          fs.writeFileSync(envPath, envContent);
        }
      });
    } catch (e) {
      console.warn('Could not auto-write refresh token to .env:', e.message);
    }
  }

  /**
   * Obtain or refresh Salesforce OAuth access token.
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

    // 1. If we have a Refresh Token, use standard Refresh Token Flow
    const activeRefreshToken = this.refreshToken || salesforceConfig.refreshToken || process.env.SALESFORCE_REFRESH_TOKEN;
    if (activeRefreshToken && clientId && clientSecret) {
      try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('refresh_token', activeRefreshToken);

        const res = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });

        const data = await res.json();

        if (res.ok) {
          this.accessToken = data.access_token;
          this.instanceUrl = data.instance_url || this.instanceUrl;
          if (data.refresh_token) {
            this.refreshToken = data.refresh_token;
            this.saveRefreshToken(data.refresh_token);
          }
          this.tokenExpiresAt = Date.now() + 110 * 60 * 1000;
          return { accessToken: this.accessToken, instanceUrl: this.instanceUrl };
        } else {
          console.warn('⚠️ Salesforce Refresh Token Error:', data.error_description || data.error);
        }
      } catch (err) {
        console.warn('Refresh token attempt warning:', err.message);
      }
    }

    // 2. Try Client Credentials Flow (Enterprise External Client App standard)
    if (!clientId || !clientSecret) {
      throw new Error('Salesforce credentials missing in server/.env');
    }

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
      } else if (username && password) {
        console.warn('Client credentials failed, falling back to password flow:', ccData.error_description || ccData.error);
      } else {
        const errorDesc = ccData.error_description || ccData.error || ccRes.statusText;
        throw new Error(`Salesforce OAuth Authentication Failed (${ccRes.status}): ${errorDesc}`);
      }
    } catch (ccErr) {
      if (!username || !password) {
        throw ccErr;
      }
    }

    // 3. Fallback to Username-Password flow if configured
    if (username && password) {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('username', username);
      params.append('password', password);

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorDesc = data.error_description || data.error || response.statusText;
          throw new Error(`Salesforce OAuth Authentication Failed (${response.status}): ${errorDesc}`);
        }

        this.accessToken = data.access_token;
        this.instanceUrl = data.instance_url || salesforceConfig.loginUrl;
        this.tokenExpiresAt = Date.now() + 110 * 60 * 1000;

        return { accessToken: this.accessToken, instanceUrl: this.instanceUrl };
      } catch (error) {
        console.error('❌ Salesforce Token Retrieval Error:', error.message);
        throw error;
      }
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
