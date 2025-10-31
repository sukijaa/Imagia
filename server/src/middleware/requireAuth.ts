import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // req.user is added by passport.deserializeUser
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  // If user exists, continue to the next function (the route handler)
  next();
};