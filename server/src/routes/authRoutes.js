import express from 'express';
import { loginAdmin, seedDevAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/seed-dev-admin', seedDevAdmin);

export default router;
