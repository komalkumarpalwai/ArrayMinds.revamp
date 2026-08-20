import express from 'express';
import {
  submitApplication,
  getCareerSubmissions,
  getCareerSubmissionById,
  updateCareerSubmissionStatus,
  deleteCareerSubmission,
} from '../controllers/careerSubmissionController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public: Submit job application with resume file
router.post('/', uploadResume.single('resume'), submitApplication);

// Admin: Retrieve and manage career submissions
router.get('/', protectAdmin, getCareerSubmissions);
router.get('/:id', protectAdmin, getCareerSubmissionById);
router.patch('/:id', protectAdmin, updateCareerSubmissionStatus);
router.delete('/:id', protectAdmin, deleteCareerSubmission);

export default router;
