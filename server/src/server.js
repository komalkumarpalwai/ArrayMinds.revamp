import app from './app.js';
import salesforceService from './services/salesforceService.js';
import { isSalesforceConfigured } from './config/salesforce.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Array-Minds Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  if (isSalesforceConfigured()) {
    console.log('⚡ Salesforce credentials detected. Verifying Salesforce Org connection...');
    try {
      const status = await salesforceService.testConnection();
      if (status.connected) {
        console.log(`✅ Salesforce Org Connected Successfully (${status.instanceUrl})`);
      } else {
        console.warn(`⚠️ Salesforce Connection Warning: ${status.error}`);
      }
    } catch (err) {
      console.warn(`⚠️ Salesforce Initialization Notice: ${err.message}`);
    }
  } else {
    console.log('ℹ️ Salesforce configuration pending in server/.env (SALESFORCE_CLIENT_ID & SALESFORCE_CLIENT_SECRET)');
  }
});
