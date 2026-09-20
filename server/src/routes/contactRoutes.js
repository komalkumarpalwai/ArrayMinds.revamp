import express from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactSubmissionById,
  updateContactStatus,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { requirePermission } from '../middleware/rbacMiddleware.js';
import { PERMISSIONS } from '../config/rbacConfig.js';

const router = express.Router();

router.route('/')
  .post(submitContactForm)
  .get(protectAdmin, requirePermission(PERMISSIONS.CONTACT_VIEW), getContactSubmissions);

router.route('/:id')
  .get(protectAdmin, requirePermission(PERMISSIONS.CONTACT_VIEW), getContactSubmissionById)
  .put(protectAdmin, requirePermission(PERMISSIONS.CONTACT_MANAGE), updateContactStatus);

export default router;
