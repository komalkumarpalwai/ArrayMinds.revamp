import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protectAdmin, createBlog);

router.route('/slug/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .put(protectAdmin, updateBlog)
  .delete(protectAdmin, deleteBlog);

export default router;
