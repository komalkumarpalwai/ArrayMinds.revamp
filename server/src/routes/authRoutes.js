import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import salesforceService from '../services/salesforceService.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getAdminProfile);

// 1-Click Salesforce OAuth Connect
router.get('/salesforce/connect', (req, res) => {
  const redirectUri =
    process.env.SALESFORCE_REDIRECT_URI ||
    `${req.protocol}://${req.get('host')}/api/auth/salesforce/callback`;
  const authUrl = salesforceService.getAuthorizeUrl(redirectUri);
  res.redirect(authUrl);
});

// 1-Click Salesforce OAuth Callback
router.get('/salesforce/callback', async (req, res) => {
  const { code, error, error_description } = req.query;
  const redirectUri =
    process.env.SALESFORCE_REDIRECT_URI ||
    `${req.protocol}://${req.get('host')}/api/auth/salesforce/callback`;

  if (error) {
    return res.status(400).send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2 style="color: #e11d48;">Salesforce Authorization Failed</h2>
        <p>${error_description || error}</p>
        <a href="http://localhost:5173/admin/dashboard" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #2D1B54; color: white; border-radius: 8px; text-decoration: none;">Return to Dashboard</a>
      </div>
    `);
  }

  try {
    const result = await salesforceService.handleCallback(code, redirectUri);
    res.send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center; max-width: 600px; margin: 40px auto; border-radius: 20px; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
        <h2 style="color: #059669; margin-bottom: 8px;">Salesforce Connected Successfully!</h2>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
          Your Node.js backend is now authenticated with your Salesforce Org (<strong>${result.instanceUrl}</strong>).
        </p>
        <div style="margin-top: 25px;">
          <a href="http://localhost:5173/careers" style="display: inline-block; margin-right: 10px; padding: 12px 24px; background: #EC1557; color: white; border-radius: 12px; font-weight: bold; text-decoration: none;">View Live Careers</a>
          <a href="http://localhost:5173/admin/dashboard" style="display: inline-block; padding: 12px 24px; background: #2D1B54; color: white; border-radius: 12px; font-weight: bold; text-decoration: none;">Admin Dashboard</a>
        </div>
      </div>
    `);
  } catch (err) {
    res.status(500).send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2 style="color: #e11d48;">Error Exchanging Token</h2>
        <p>${err.message}</p>
        <a href="/api/auth/salesforce/connect" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #EC1557; color: white; border-radius: 8px; text-decoration: none;">Try Again</a>
      </div>
    `);
  }
});

export default router;
