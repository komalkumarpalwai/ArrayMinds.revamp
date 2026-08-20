import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import careerSubmissionRoutes from './routes/careerSubmissionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded resumes statically
app.use('/uploads/resumes', express.static(path.resolve(process.cwd(), 'uploads', 'resumes')));

// Root & API Health Routes
app.get('/', (req, res) => {
  res.json({
    name: 'Array-Minds API Server',
    status: 'Operational',
    clientUrl: 'http://localhost:5173',
    endpoints: {
      health: '/api',
      blogs: '/api/blogs',
      careers: '/api/careers',
      careerSubmissions: '/api/career-submissions',
      contact: '/api/contact',
      auth: '/api/auth/login',
    },
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Array-Minds API Server is operational', salesforce: 'Connected' });
});

// Mounted Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/career-submissions', careerSubmissionRoutes);
app.use('/api/contact', contactRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
