import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { requirePermission } from '../middleware/rbacMiddleware.js';
import { PERMISSIONS } from '../config/rbacConfig.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protectAdmin, requirePermission(PERMISSIONS.BLOG_CREATE), createBlog);

router.route('/slug/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .get(getBlogBySlug)
  .put(protectAdmin, requirePermission(PERMISSIONS.BLOG_EDIT), updateBlog)
  .delete(protectAdmin, requirePermission(PERMISSIONS.BLOG_DELETE), deleteBlog);

export default router;
