import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'array_minds_jwt_super_secret_key_2026';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.admin = {
        id: decoded.id,
        name: decoded.name || 'Admin',
        email: decoded.email,
        role: decoded.role || 'superadmin',
      };

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, session token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no bearer token provided' });
  }
};
