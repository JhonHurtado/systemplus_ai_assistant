import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { rateLimit } from 'express-rate-limit';

// Import middleware and services
import { authMiddleware } from './middleware/auth';
import { ContextEngine } from './services/contextEngine';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configure middleware
app.use(helmet());
app.use(express.json());

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'https://www.systemplus.systems',
  'https://systemplus.edu.co',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000, // 1 minute
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 30, // 30 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
});

// Apply rate limiter to all requests
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Initialize context engine
const contextEngine = new ContextEngine();

// API Routes

// Endpoint for widget messages
app.post('/api/widget/message', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = await contextEngine.processQuery(message);
    return res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Error processing message' });
  }
});

// Protected endpoint to update context
app.put('/api/admin/context', authMiddleware, async (req, res) => {
  try {
    const newContext = req.body;
    
    if (!newContext || Object.keys(newContext).length === 0) {
      return res.status(400).json({ error: 'Context data is required' });
    }
    
    await contextEngine.updateContext(newContext);
    return res.json({ success: true, message: 'Context updated successfully' });
  } catch (error) {
    console.error('Error updating context:', error);
    return res.status(500).json({ error: 'Error updating context' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
