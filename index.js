import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Load env vars
dotenv.config({ path: '../.env' }); // path relative to where server runs, but since we'll run from server dir, let's just use regular config if .env is in server, or default to root
// Actually, dotenv.config() looks in the current working directory. Since we run from `server/`, I'll specify path to root.
dotenv.config({ path: '../.env' }); 

// Connect to database
connectDB();

const app = express();

// Security and Optimization Middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, 
    legacyHeaders: false, 
});
app.use('/api/', apiLimiter);

// Routes
const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/employees`, employeeRoutes);
app.use(`${API_VERSION}/dashboard`, dashboardRoutes);

// Health check route
app.get(`${API_VERSION}/health`, (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
