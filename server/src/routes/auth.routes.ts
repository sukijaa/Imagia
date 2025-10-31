import { Router, Request, Response } from 'express';
import passport from 'passport';

const router = Router();

// --- Google Routes ---
// 1. Initiates the Google login flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // What we are asking Google for
  })
);

// 2. The callback Google sends the user back to
router.get(
  '/google/callback',
  passport.authenticate('google'), // Completes the flow
  (req: Request, res: Response) => {
    // Redirect to the frontend (which we'll build in Part 3)
    res.redirect('http://localhost:5173');
  }
);

// --- GitHub Routes ---
// 1. Initiates the GitHub login flow
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'], // What we are asking GitHub for
  })
);

// 2. The callback GitHub sends the user back to
router.get(
  '/github/callback',
  passport.authenticate('github'), // Completes the flow
  (req: Request, res: Response) => {
    // Redirect to the frontend
    res.redirect('http://localhost:5173');
  }
);

// --- API Routes for Frontend ---
// This is how our frontend will know if we are logged in
router.get('/current_user', (req: Request, res: Response) => {
  res.send(req.user); // req.user is automatically added by Passport
});

// This is how we log out
router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ error: 'Logout failed' });
    }
    res.redirect('http://localhost:5173/login'); // Redirect to the main page
  });
});

export default router;