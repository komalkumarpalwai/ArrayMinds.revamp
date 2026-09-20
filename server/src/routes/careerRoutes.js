import express from 'express';
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { requirePermission } from '../middleware/rbacMiddleware.js';
import { PERMISSIONS } from '../config/rbacConfig.js';

const router = express.Router();

router.route('/')
  .get(getCareers)
  .post(protectAdmin, requirePermission(PERMISSIONS.CAREER_CREATE), createCareer);

router.route('/:id')
  .get(getCareerById)
  .put(protectAdmin, requirePermission(PERMISSIONS.CAREER_EDIT), updateCareer)
  .delete(protectAdmin, requirePermission(PERMISSIONS.CAREER_DELETE), deleteCareer);

export default router;
