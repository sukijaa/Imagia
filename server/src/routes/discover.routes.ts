import { Router, Request, Response } from 'express';
import Collection from '../models/Collection.model';

const router = Router();

// --- GET /api/discover ---
// @desc    Get all public collections, sorted by likes
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const publicCollections = await Collection.find({ isPublic: true })
      .populate('user', 'displayName profilePhoto') // Get author's info
      .sort({ 'likes.length': -1, createdAt: -1 }); // Sort by most likes

    res.json(publicCollections);
  } catch (error) {
    console.error('Error fetching discover feed:', error);
    res.status(500).send({ error: 'Failed to fetch discover feed' });
  }
});

export default router;