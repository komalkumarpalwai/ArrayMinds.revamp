import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
  toggleUserLock,
  adminResetPassword,
  deleteUser,
} from '../controllers/userController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { requirePermission } from '../middleware/rbacMiddleware.js';
import { PERMISSIONS } from '../config/rbacConfig.js';

const router = express.Router();

// All user management routes require valid authentication
router.use(protectAdmin);

router.route('/')
  .get(requirePermission(PERMISSIONS.USER_VIEW), getUsers)
  .post(requirePermission(PERMISSIONS.USER_CREATE), createUser);

router.route('/:id')
  .get(requirePermission(PERMISSIONS.USER_VIEW), getUserById)
  .put(requirePermission(PERMISSIONS.USER_EDIT), updateUser)
  .delete(requirePermission(PERMISSIONS.USER_DELETE), deleteUser);

router.patch('/:id/status', requirePermission(PERMISSIONS.USER_EDIT), toggleUserStatus);
router.patch('/:id/lock', requirePermission(PERMISSIONS.USER_EDIT), toggleUserLock);
router.post('/:id/reset-password', requirePermission(PERMISSIONS.USER_RESET_PASSWORD), adminResetPassword);

export default router;
