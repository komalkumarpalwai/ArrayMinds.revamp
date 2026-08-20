import jwt from 'jsonwebtoken';
import { salesforceConfig } from '../config/salesforce.js';

const JWT_SECRET = process.env.JWT_SECRET || 'array_minds_jwt_super_secret_key_2026';

const generateToken = (adminPayload) => {
  return jwt.sign(
    {
      id: adminPayload.id,
      name: adminPayload.name,
      email: adminPayload.email,
      role: adminPayload.role || 'superadmin',
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Admin Login (Authenticated via Configured Admin / Salesforce)
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const configuredAdminEmail = (process.env.ADMIN_EMAIL || 'admin@arrayminds.com').toLowerCase();
  const configuredAdminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

  // 1. Check against configured Admin credentials
  if (
    email.toLowerCase().trim() === configuredAdminEmail &&
    password === configuredAdminPassword
  ) {
    const adminData = {
      id: 'sf-admin-master',
      name: 'Array Minds Administrator',
      email: configuredAdminEmail,
      role: 'superadmin',
    };

    return res.json({
      token: generateToken(adminData),
      admin: adminData,
    });
  }

  // 2. Alternatively attempt direct Salesforce OAuth Password authentication
  if (salesforceConfig.clientId && salesforceConfig.clientSecret) {
    try {
      const tokenUrl = `${salesforceConfig.loginUrl.replace(/\/+$/, '')}/services/oauth2/token`;
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', salesforceConfig.clientId);
      params.append('client_secret', salesforceConfig.clientSecret);
      params.append('username', email.trim());
      params.append('password', password);

      const sfRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (sfRes.ok) {
        const sfData = await sfRes.json();
        const adminData = {
          id: sfData.id || 'sf-user',
          name: email.split('@')[0],
          email: email.trim(),
          role: 'admin',
          instanceUrl: sfData.instance_url,
        };

        return res.json({
          token: generateToken(adminData),
          admin: adminData,
        });
      }
    } catch (sfErr) {
      console.warn('Salesforce direct OAuth check error:', sfErr.message);
    }
  }

  return res.status(401).json({ message: 'Invalid email or password' });
};

// @desc    Check Current Admin Auth Session Status
// @route   GET /api/auth/me
// @access  Private/Admin
export const getAdminProfile = async (req, res) => {
  res.json({
    authenticated: true,
    admin: req.admin,
  });
};
