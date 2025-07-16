import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '~/env';


declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Invalid token' });
  }
};