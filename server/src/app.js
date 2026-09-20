import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import careerSubmissionRoutes from './routes/careerSubmissionRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Lightweight Cookie Parser Middleware
const cookieParser = (req, res, next) => {
  req.cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      const name = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (name) {
        req.cookies[name] = decodeURIComponent(val);
      }
    });
  }
  next();
};

// Middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://arrayminds.in',
  'https://www.arrayminds.in',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // permissive for staging/dev
    },
    credentials: true,
  })
);

app.use(cookieParser);
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
      auth: '/api/auth/login',
      users: '/api/users',
      auditLogs: '/api/audit-logs',
      blogs: '/api/blogs',
      careers: '/api/careers',
      careerSubmissions: '/api/career-submissions',
      contact: '/api/contact',
    },
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Array-Minds API Server is operational' });
});

app.get('/api/health', async (req, res) => {
  try {
    const { salesforceConfig } = await import('./config/salesforce.js');
    const salesforceService = (await import('./services/salesforceService.js')).default;
    const tokenInfo = await salesforceService.getAccessToken();
    res.json({
      status: 'OK',
      salesforce: 'Connected',
      instanceUrl: tokenInfo.instanceUrl,
      hasClientId: !!salesforceConfig.clientId,
      hasClientSecret: !!salesforceConfig.clientSecret,
      loginUrl: salesforceConfig.loginUrl,
    });
  } catch (err) {
    const { salesforceConfig } = await import('./config/salesforce.js');
    res.status(500).json({
      status: 'Error',
      salesforce: 'Connection Failed',
      error: err.message,
      hasClientId: !!salesforceConfig.clientId,
      hasClientSecret: !!salesforceConfig.clientSecret,
      loginUrl: salesforceConfig.loginUrl,
    });
  }
});

// Mounted Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/career-submissions', careerSubmissionRoutes);
app.use('/api/contact', contactRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
