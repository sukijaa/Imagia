import { Router, Request, Response } from 'express';
import axios from 'axios';
import { requireAuth } from '../middleware/requireAuth'; // Our auth middleware
import Search from '../models/Search.model';
import { IUser } from '../models/User.model';
import { UNSPLASH_ACCESS_KEY } from '../config/keys';

const router = Router();

// Create a pre-configured axios instance for Unsplash
const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

// --- POST /api/search ---
// @desc    Search for images and log the search
// @access  Private (requires login)
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { term } = req.body;
  
  if (!term) {
    return res.status(400).send({ error: 'Search term is required' });
  }

  try {
    // 1. Log the search in our database (fire and forget)
    // req.user is available thanks to our passport/session setup
    const searchLog = new Search({
      user: (req.user as IUser)._id, // Cast req.user to IUser
      term: term,
    });
    // We don't need to 'await' this, we can let it save in the background
    searchLog.save(); 

    // 2. Call the Unsplash API
    const response = await unsplashApi.get('/search/photos', {
      params: {
        query: term,
        per_page: 20, // Get 20 images
      },
    });

    // 3. Return results to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Unsplash API error:', error);
    res.status(500).send({ error: 'Failed to fetch images from Unsplash' });
  }
});

// --- GET /api/search/top ---
// @desc    Get top 5 most frequent search terms
// @access  Public (or Private, your choice - we'll make it private)
router.get('/top', requireAuth, async (req: Request, res: Response) => {
  try {
    // This is the "impressive" part - a MongoDB Aggregation Pipeline
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term', // Group by the search term
          count: { $sum: 1 }, // Count occurrences
        },
      },
      {
        $sort: { count: -1 }, // Sort by count descending
      },
      {
        $limit: 5, // Get top 5
      },
      {
        $project: {
          _id: 0, // Don't include the _id field
          term: '$_id', // Rename _id to 'term'
          count: 1, // Include the count
        },
      },
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Top search aggregation error:', error);
    res.status(500).send({ error: 'Failed to get top searches' });
  }
});

export default router;