if (
  !process.env.MONGO_URI ||
  !process.env.PORT ||
  !process.env.COOKIE_KEY ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.UNSPLASH_ACCESS_KEY ||
  !process.env.CLIENT_URL ||
  !process.env.SERVER_URL // <-- 1. ADD THIS CHECK
) {
  throw new Error('Missing one or more required environment variables');
}

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const COOKIE_KEY = process.env.COOKIE_KEY;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SERVER_URL = process.env.SERVER_URL; // <-- 2. ADD THIS EXPORT