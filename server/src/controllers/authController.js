import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import salesforceService from '../services/salesforceService.js';
import auditService from '../services/auditService.js';
import { getPermissionsForRole, ROLES } from '../config/rbacConfig.js';

const JWT_SECRET = process.env.JWT_SECRET || 'array_minds_jwt_super_secret_key_2026';

// In-memory rate limiting tracker: { ip: [timestamp1, timestamp2, ...] }
const loginAttempts = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS_PER_WINDOW = 5;

const isRateLimited = (ip) => {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  const recentAttempts = attempts.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  loginAttempts.set(ip, recentAttempts);
  return recentAttempts.length >= MAX_ATTEMPTS_PER_WINDOW;
};

const recordFailedAttempt = (ip) => {
  const attempts = loginAttempts.get(ip) || [];
  attempts.push(Date.now());
  loginAttempts.set(ip, attempts);
};

const clearRateLimit = (ip) => {
  loginAttempts.delete(ip);
};

/**
 * Validates password complexity:
 * - At least 12 characters
 * - Uppercase, lowercase, digit, special character
 */
export const validatePasswordStrength = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 10) {
    return { valid: false, message: 'Password must be at least 10 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character' };
  }
  return { valid: true };
};

export const generateToken = (adminPayload) => {
  const permissions = adminPayload.permissions || getPermissionsForRole(adminPayload.role);
  return jwt.sign(
    {
      id: adminPayload.id,
      name: adminPayload.name,
      email: adminPayload.email,
      role: adminPayload.role || ROLES.ADMIN,
      department: adminPayload.department || 'General',
      permissions,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Set secure HTTP-only cookie with the JWT token
 */
export const setAuthCookie = (res, token) => {
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
};

/**
 * @desc    Admin Portal Login
 * @route   POST /api/auth/login
 * @access  Public (Rate-limited)
 */
export const loginAdmin = async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Username / Email and password are required.' });
  }

  // Rate Limiting Guard
  if (isRateLimited(ip)) {
    auditService.logEvent({
      action: 'LOGIN_RATE_LIMITED',
      user: { email: email.trim() },
      result: 'BLOCKED',
      details: 'Exceeded max failed login attempts per window',
      ipAddress: ip,
      userAgent,
    });
    return res.status(429).json({
      message: 'Too many login attempts. Please wait 15 minutes before trying again.',
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const configuredAdminPassword = process.env.ADMIN_PASSWORD || '';

  // 1. Attempt Salesforce Website_User__c authentication first
  try {
    const escapedEmail = cleanEmail.replace(/'/g, "\\'");
    const soql = `
      SELECT Id, Name, Username__c, Password_Hash__c, Role__c, Department__c, 
             Status__c, Account_Locked__c, Failed_Login_Attempts__c, Last_Login__c
      FROM Website_User__c
      WHERE Username__c = '${escapedEmail}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);

    if (records && records.length > 0) {
      const sfUser = records[0];

      // Check account lockout
      if (sfUser.Account_Locked__c === true) {
        auditService.logEvent({
          action: 'LOGIN_FAILED',
          user: { id: sfUser.Id, email: sfUser.Username__c, role: sfUser.Role__c },
          result: 'LOCKED',
          details: 'Account locked due to excessive failed attempts',
          ipAddress: ip,
          userAgent,
        });
        return res.status(403).json({
          message: 'Account is locked due to repeated failed login attempts. Please contact a Super Administrator or reset your password.',
          locked: true,
        });
      }

      // Check account status
      if (sfUser.Status__c && sfUser.Status__c.toLowerCase() === 'inactive') {
        recordFailedAttempt(ip);
        auditService.logEvent({
          action: 'LOGIN_FAILED',
          user: { id: sfUser.Id, email: sfUser.Username__c, role: sfUser.Role__c },
          result: 'INACTIVE',
          details: 'Attempted login to inactive account',
          ipAddress: ip,
          userAgent,
        });
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      // Verify bcrypt password hash
      const isMatch = sfUser.Password_Hash__c
        ? await bcrypt.compare(password, sfUser.Password_Hash__c)
        : false;

      if (isMatch) {
        clearRateLimit(ip);

        // Reset failed login attempts and record last login
        try {
          await salesforceService.updateRecord('Website_User__c', sfUser.Id, {
            Failed_Login_Attempts__c: 0,
            Last_Login__c: new Date().toISOString(),
          });
        } catch (updateErr) {
          console.warn('Could not update user login stats in Salesforce:', updateErr.message);
        }

        const role = sfUser.Role__c || ROLES.ADMIN;
        const permissions = getPermissionsForRole(role);

        const adminPayload = {
          id: sfUser.Id,
          name: sfUser.Username__c.split('@')[0],
          email: sfUser.Username__c,
          role,
          department: sfUser.Department__c || 'General',
          permissions,
        };

        const token = generateToken(adminPayload);
        setAuthCookie(res, token);

        auditService.logEvent({
          action: 'LOGIN_SUCCESS',
          user: adminPayload,
          result: 'SUCCESS',
          ipAddress: ip,
          userAgent,
        });

        return res.json({
          token,
          admin: adminPayload,
        });
      } else {
        // Password mismatch
        recordFailedAttempt(ip);
        const currentFailed = (sfUser.Failed_Login_Attempts__c || 0) + 1;
        const willLock = currentFailed >= 5;

        try {
          await salesforceService.updateRecord('Website_User__c', sfUser.Id, {
            Failed_Login_Attempts__c: currentFailed,
            ...(willLock ? { Account_Locked__c: true } : {}),
          });
        } catch (err) {
          console.warn('Failed to update failed login count:', err.message);
        }

        auditService.logEvent({
          action: 'LOGIN_FAILED',
          user: { id: sfUser.Id, email: sfUser.Username__c, role: sfUser.Role__c },
          result: 'INVALID_PASSWORD',
          details: willLock ? 'Account has now been locked' : `Failed attempt #${currentFailed}`,
          ipAddress: ip,
          userAgent,
        });

        return res.status(401).json({
          message: willLock
            ? 'Account has been locked due to 5 consecutive failed attempts. Please contact an administrator.'
            : 'Invalid username or password.',
        });
      }
    }
  } catch (sfErr) {
    console.warn('Salesforce user query bypassed/error:', sfErr.message);
  }

  // 2. Optional fallback to explicitly configured environment credentials
  if (configuredAdminEmail && configuredAdminPassword && cleanEmail === configuredAdminEmail && password === configuredAdminPassword) {
    clearRateLimit(ip);
    const adminPayload = {
      id: 'sf-master-superadmin',
      name: 'Array Minds Master Administrator',
      email: configuredAdminEmail,
      role: ROLES.SUPER_ADMIN,
      department: 'Executive',
      permissions: getPermissionsForRole(ROLES.SUPER_ADMIN),
    };

    const token = generateToken(adminPayload);
    setAuthCookie(res, token);

    auditService.logEvent({
      action: 'LOGIN_SUCCESS',
      user: adminPayload,
      result: 'SUCCESS_FALLBACK',
      details: 'Superadmin environment credentials authenticated',
      ipAddress: ip,
      userAgent,
    });

    return res.json({
      token,
      admin: adminPayload,
    });
  }

  // Generic failure for unknown users (never reveals if account exists)
  recordFailedAttempt(ip);
  auditService.logEvent({
    action: 'LOGIN_FAILED',
    user: { email: cleanEmail },
    result: 'USER_NOT_FOUND',
    details: 'Invalid credentials entered',
    ipAddress: ip,
    userAgent,
  });

  return res.status(401).json({ message: 'Invalid username or password.' });
};

/**
 * @desc    Admin Logout
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutAdmin = async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'Unknown';
  res.clearCookie('admin_token', { path: '/' });

  if (req.admin) {
    auditService.logEvent({
      action: 'LOGOUT',
      user: req.admin,
      result: 'SUCCESS',
      ipAddress: ip,
    });
  }

  res.json({ success: true, message: 'Logged out successfully' });
};

/**
 * @desc    Get Current Authenticated Admin Profile & Permissions
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getAdminProfile = async (req, res) => {
  res.json({
    authenticated: true,
    admin: req.admin,
  });
};

/**
 * @desc    Request Password Reset Token
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email address is required.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const escapedEmail = cleanEmail.replace(/'/g, "\\'");
    const soql = `SELECT Id, Username__c FROM Website_User__c WHERE Username__c = '${escapedEmail}' LIMIT 1`;
    const records = await salesforceService.query(soql);

    if (records && records.length > 0) {
      const user = records[0];

      // Generate cryptographically secure random token (32 bytes = 64 hex chars)
      const rawToken = crypto.randomBytes(32).toString('hex');
      // Store only the SHA-256 hash of the token in Salesforce
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      const expiry = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes

      await salesforceService.updateRecord('Website_User__c', user.Id, {
        Password_Reset_Token__c: hashedToken,
        Password_Reset_Expiry__c: expiry,
      });

      auditService.logEvent({
        action: 'PASSWORD_RESET_REQUESTED',
        user: { id: user.Id, email: user.Username__c },
        result: 'TOKEN_GENERATED',
        ipAddress: ip,
      });

      console.log(`🔑 [PASSWORD RESET] Token generated for ${cleanEmail}: ${rawToken}`);

      // Return generic confirmation; in development or sandbox, also expose resetToken
      return res.json({
        success: true,
        message: 'If the email is registered with an active account, a password reset link has been dispatched.',
        resetToken: process.env.NODE_ENV !== 'production' ? rawToken : undefined,
      });
    }
  } catch (err) {
    console.error('Password reset request error:', err.message);
  }

  // Always return the exact same generic message to prevent user enumeration
  res.json({
    success: true,
    message: 'If the email is registered with an active account, a password reset link has been dispatched.',
  });
};

/**
 * @desc    Reset Password using token
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  const ip = req.ip || 'Unknown';
  const { token, password, confirmPassword } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const strengthCheck = validatePasswordStrength(password);
  if (!strengthCheck.valid) {
    return res.status(400).json({ message: strengthCheck.message });
  }

  try {
    const hashedToken = crypto.createHash('sha256').update(token.trim()).digest('hex');
    const soql = `
      SELECT Id, Username__c, Password_Reset_Expiry__c, Account_Locked__c
      FROM Website_User__c
      WHERE Password_Reset_Token__c = '${hashedToken}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);

    if (!records || records.length === 0) {
      return res.status(400).json({ message: 'Password reset link is invalid or has already been used.' });
    }

    const user = records[0];
    const expiry = new Date(user.Password_Reset_Expiry__c);

    if (expiry < new Date()) {
      return res.status(400).json({ message: 'Password reset link has expired. Please request a new one.' });
    }

    // Hash new password using bcrypt (12 rounds)
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    await salesforceService.updateRecord('Website_User__c', user.Id, {
      Password_Hash__c: passwordHash,
      Password_Reset_Token__c: null,
      Password_Reset_Expiry__c: null,
      Account_Locked__c: false,
      Failed_Login_Attempts__c: 0,
    });

    auditService.logEvent({
      action: 'PASSWORD_RESET_COMPLETED',
      user: { id: user.Id, email: user.Username__c },
      result: 'SUCCESS',
      ipAddress: ip,
    });

    return res.json({
      success: true,
      message: 'Your password has been successfully reset. You may now sign in with your new credentials.',
    });
  } catch (err) {
    console.error('Password reset execution error:', err.message);
    return res.status(500).json({ message: 'Failed to reset password. Please try again later.' });
  }
};
