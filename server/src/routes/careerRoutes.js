import express from 'express';
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCareers)
  .post(protectAdmin, createCareer);

router.route('/:id')
  .get(getCareerById)
  .put(protectAdmin, updateCareer)
  .delete(protectAdmin, deleteCareer);

export default router;
