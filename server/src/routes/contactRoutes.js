import express from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactSubmissionById,
  updateContactStatus,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitContactForm)
  .get(protectAdmin, getContactSubmissions);

router.route('/:id')
  .get(protectAdmin, getContactSubmissionById)
  .put(protectAdmin, updateContactStatus);

export default router;
