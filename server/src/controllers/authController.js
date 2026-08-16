import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'array_minds_jwt_super_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed Development Admin User (Development Setup Only)
// @route   POST /api/auth/seed-dev-admin
// @access  Public (Development setup)
export const seedDevAdmin = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }

    const devAdmin = await Admin.create({
      name: 'Array-Minds Admin',
      email: 'admin@arrayminds.com',
      password: 'AdminPassword123!',
      role: 'superadmin',
    });

    res.status(201).json({
      message: 'Development admin created successfully',
      email: devAdmin.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
