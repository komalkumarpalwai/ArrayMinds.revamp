import jwt from 'jsonwebtoken';
import { getPermissionsForRole } from '../config/rbacConfig.js';

const JWT_SECRET = process.env.JWT_SECRET || 'array_minds_jwt_super_secret_key_2026';

/**
 * Protect Admin Routes:
 * Validates JWT token from either:
 * 1. Authorization: Bearer <token>
 * 2. HTTP-only Cookie 'admin_token'
 */
export const protectAdmin = async (req, res, next) => {
  let token = null;

  // 1. Check Authorization Bearer header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // 2. Check HTTP-only cookie
  else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }
  // 3. Fallback check from cookie header string if cookie-parser is not active
  else if (req.headers.cookie) {
    const match = req.headers.cookie.match(/(?:^|;\s*)admin_token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Authentication required: No valid session token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const role = decoded.role || 'Admin';
    const permissions = getPermissionsForRole(role);

    req.admin = {
      id: decoded.id,
      name: decoded.name || (decoded.email ? decoded.email.split('@')[0] : 'Admin'),
      email: decoded.email,
      role,
      department: decoded.department || 'General',
      permissions,
    };

    return next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ message: 'Session expired or token invalid. Please log in again.' });
  }
};
