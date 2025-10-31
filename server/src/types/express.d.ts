import { IUser } from '../models/User.model'; // Import our Mongoose user type

// This "augments" the Express module
// It tells TypeScript to merge our definition with the original one
declare global {
  namespace Express {
    // Now, req.user will be of type IUser, which has an _id
    export interface User extends IUser {} 
  }
}