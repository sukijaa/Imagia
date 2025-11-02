// AT THE VERY TOP

import historyRoutes from './routes/history.routes'; // <-- ADD THIS
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --- IMPORTS ---
 // <-- ADD THIS
import discoverRoutes from './routes/discover.routes';
import express, { Express, Request, Response } from 'express';
import searchRoutes from './routes/search.routes'; // <-- ADD THIS
import collectionRoutes from './routes/collection.routes'; // <-- ADD THIS
import cors from 'cors';
import session from 'express-session'; // --- CHANGED ---
import passport from 'passport';
import { PORT, COOKIE_KEY, CLIENT_URL } from './config/keys';

import connectDB from './db';
import './services/passport'; 
import authRoutes from './routes/auth.routes'; 

// Initialize Express app
const app: Express = express();

// Connect to Database
connectDB();

// --- Middlewares (ORDER IS CRITICAL) ---
app.use(
  cors({
    origin: CLIENT_URL, // Your React app's address
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. Express Session Middleware --- THIS BLOCK IS NEW ---
// Replaces cookieSession
// ... (right after express.urlencoded)

// This tells Express to trust the proxy (like Render)
app.set('trust proxy', 1); 

// 1. Express Session Middleware
app.use(
  session({
    secret: COOKIE_KEY, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

      // --- THIS IS THE FIX ---
      // Use secure, cross-site cookies only in production
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

// 2. Passport Middleware
// ... (rest of the file is the same)

// 2. Passport Middleware
// Initializes Passport and tells it to use the session.
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
// Mount the authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/discover', discoverRoutes); // <-- ADD THIS
app.use('/api/history', historyRoutes); // <-- ADD THIS
app.use('/api/collections', collectionRoutes); // <-- ADD THIS

// Test Route (still good to have)
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Imageboard server!' });
});

// --- Start Server ---
app.listen(PORT, () => {
  // Remember we changed the port to 8000
  console.log(`Server is running on http://localhost:${PORT}`);
});