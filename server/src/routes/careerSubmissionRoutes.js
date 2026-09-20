import express from 'express';
import {
  submitApplication,
  getCareerSubmissions,
  getCareerSubmissionById,
  updateCareerSubmissionStatus,
  deleteCareerSubmission,
} from '../controllers/careerSubmissionController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { requirePermission } from '../middleware/rbacMiddleware.js';
import { PERMISSIONS } from '../config/rbacConfig.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public: Submit job application with resume file
router.post('/', uploadResume.single('resume'), submitApplication);

// Admin: Retrieve and manage career submissions
router.get('/', protectAdmin, requirePermission(PERMISSIONS.APPLICATION_VIEW), getCareerSubmissions);
router.get('/:id', protectAdmin, requirePermission(PERMISSIONS.APPLICATION_VIEW), getCareerSubmissionById);
router.patch('/:id', protectAdmin, requirePermission(PERMISSIONS.APPLICATION_VIEW), updateCareerSubmissionStatus);
router.delete('/:id', protectAdmin, requirePermission(PERMISSIONS.CAREER_DELETE), deleteCareerSubmission);

export default router;
