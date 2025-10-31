import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import Collection from '../models/Collection.model';
import { IUser } from '../models/User.model';

const router = Router();

// --- 1. POST /api/collections ---
// @desc    Create a new collection
// @access  Private
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { title, description, images, isPublic } = req.body;
  const userId = (req.user as IUser)._id;

  if (!title || !images) {
    return res.status(400).send({ error: 'Title and images are required' });
  }

  try {
    const newCollection = new Collection({
      user: userId,
      title,
      description,
      images,
      isPublic,
    });

    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).send({ error: 'Failed to create collection' });
  }
});

// --- 2. GET /api/collections ---
// @desc    Get all collections for the logged-in user
// @access  Private
router.get('/', requireAuth, async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;
  try {
    const collections = await Collection.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(collections);
  } catch (error) {
    console.error('Error fetching user collections:', error);
    res.status(500).send({ error: 'Failed to fetch collections' });
  }
});

// --- 3. GET /api/collections/:id ---
// @desc    Get a single collection by its ID
// @access  Public (if collection.isPublic is true) or Private (if user is owner)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      'user',
      'displayName profilePhoto'
    );

    if (!collection) {
      return res.status(404).send({ error: 'Collection not found' });
    }

    // This is the core logic!
    // Check if the collection is public
    if (collection.isPublic) {
      return res.json(collection);
    }

    // If it's NOT public, check if a user is logged in
    if (!req.user) {
      return res.status(401).send({ error: 'You must be logged in to view this' });
    }

    // If user is logged in, check if they are the owner
    const userId = (req.user as IUser)._id;
    if (collection.user.toString() === userId.toString()) {
      return res.json(collection);
    }

    // If not public and not owner, deny access
    return res.status(403).send({ error: 'Access denied' });
  } catch (error) {
    console.error('Error fetching single collection:', error);
    res.status(500).send({ error: 'Failed to fetch collection' });
  }
});

// --- 4. PUT /api/collections/:id ---
// @desc    Update a collection
// @access  Private (Owner only)
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const { title, description, images, isPublic } = req.body;
  const userId = (req.user as IUser)._id;

  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).send({ error: 'Collection not found' });
    }

    // Check for ownership
    if (collection.user.toString() !== userId.toString()) {
      return res.status(403).send({ error: 'Access denied: Not the owner' });
    }

    // Update the fields
    collection.title = title || collection.title;
    collection.description = description || collection.description;
    collection.isPublic = isPublic === undefined ? collection.isPublic : isPublic;
    if (images) {
      collection.images = images;
    }

    await collection.save();
    res.json(collection);
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).send({ error: 'Failed to update collection' });
  }
});

// --- 5. DELETE /api/collections/:id ---
// @desc    Delete a collection
// @access  Private (Owner only)
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).send({ error: 'Collection not found' });
    }

    // Check for ownership
    if (collection.user.toString() !== userId.toString()) {
      return res.status(403).send({ error: 'Access denied: Not the owner' });
    }

    // Perform the delete
    await Collection.deleteOne({ _id: req.params.id });

    res.json({ message: 'Collection removed successfully' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).send({ error: 'Failed to delete collection' });
  }
});

// ... (This goes after your DELETE route)

// --- 6. POST /api/collections/:id/like ---
// @desc    Like or unlike a collection
// @access  Private
router.post('/:id/like', requireAuth, async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id;

  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).send({ error: 'Collection not found' });
    }

    // Toggle the like
    // Check if the user's ID is already in the 'likes' array
    const likeIndex = collection.likes.findIndex(id => id.toString() === userId.toString());

    if (likeIndex > -1) {
      // User has already liked, so UNLIKE
      collection.likes.splice(likeIndex, 1);
    } else {
      // User has not liked, so LIKE
      collection.likes.push(userId);
    }

    await collection.save();
    res.json({ likes: collection.likes }); // Return the new array of likes
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).send({ error: 'Failed to toggle like' });
  }
});

export default router; // This line should be last