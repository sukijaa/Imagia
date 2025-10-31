import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/requireAuth'; // Our auth middleware
import Search from '../models/Search.model'; // Our Search model
import { IUser } from '../models/User.model'; // To cast our user type

const router = Router();

// --- GET /api/history ---
// @desc    Get the logged-in user's search history
// @access  Private
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)._id;

    const history = await Search.find({ user: userId })
      .sort({ timestamp: -1 }) // Newest first
      .limit(20); // Get the last 20 searches

    res.json(history);
  } catch (error) {
    console.error('Failed to fetch user history:', error);
    res.status(500).send({ error: 'Failed to fetch history' });
  }
});

export default router;