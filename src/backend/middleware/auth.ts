import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define custom interface for Request with user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Middleware to authenticate requests using JWT
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret);
    
    // Attach user information to request object
    req.user = decoded;
    
    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
