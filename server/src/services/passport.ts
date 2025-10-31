import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback as GoogleVerifyCallback } from 'passport-google-oauth20';
// --- THIS LINE IS UPDATED ---
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import User from '../models/User.model';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '../config/keys';

// --- Serialize User ---
passport.serializeUser((user: any, done) => {
  done(null, user.id); // user.id is the shortcut for _id
});

// --- Deserialize User ---
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- Google Strategy ---
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: GoogleVerifyCallback) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
          profilePhoto: profile.photos?.[0]?.value,
        }).save();
        done(null, newUser);
      } catch (err: any) {
        done(err, false);
      }
    }
  )
);

// --- GitHub Strategy ---
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
      proxy: true,
      scope: ['user:email'],
    },
    // --- THIS LINE IS UPDATED ---
    async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (err: any, user?: any) => void) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await new User({
          githubId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || null,
          profilePhoto: profile.photos?.[0]?.value,
        }).save();
        done(null, newUser);
      } catch (err: any) {
        done(err, false);
      }
    }
  )
);