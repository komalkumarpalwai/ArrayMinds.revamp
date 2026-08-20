import dotenv from 'dotenv';
dotenv.config();

export const salesforceConfig = {
  loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com',
  clientId: process.env.SALESFORCE_CLIENT_ID || '',
  clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
  username: process.env.SALESFORCE_USERNAME || '',
  password: process.env.SALESFORCE_PASSWORD || '',
  redirectUri: process.env.SALESFORCE_REDIRECT_URI || '',
  apiVersion: process.env.SALESFORCE_API_VERSION || 'v59.0',
  instanceUrl: process.env.SALESFORCE_INSTANCE_URL || '',
  accessToken: process.env.SALESFORCE_ACCESS_TOKEN || '',
  refreshToken: process.env.SALESFORCE_REFRESH_TOKEN || '',
};

export const isSalesforceConfigured = () => {
  return (
    (!!salesforceConfig.clientId && !!salesforceConfig.clientSecret) ||
    (!!salesforceConfig.accessToken && !!salesforceConfig.instanceUrl)
  );
};
