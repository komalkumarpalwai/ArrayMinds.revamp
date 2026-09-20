import dotenv from 'dotenv';
dotenv.config();

export const salesforceConfig = {
  loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com',
  clientId: process.env.SALESFORCE_CLIENT_ID || '',
  clientSecret: process.env.SALESFORCE_CLIENT_SECRET || '',
  username: process.env.SALESFORCE_USERNAME || '',
  password: process.env.SALESFORCE_PASSWORD || '',
  apiVersion: process.env.SALESFORCE_API_VERSION || 'v59.0',
};

export const isSalesforceConfigured = () => {
  return !!salesforceConfig.clientId && !!salesforceConfig.clientSecret;
};
