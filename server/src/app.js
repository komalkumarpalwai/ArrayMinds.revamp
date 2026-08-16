import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Base Route Verification
app.get('/api', (req, res) => {
  res.json({ message: 'Array-Minds API Server is operational' });
});

// Mounted Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
