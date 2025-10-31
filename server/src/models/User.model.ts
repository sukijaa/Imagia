import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string; // <-- THIS IS THE FIX
  googleId?: string;
  githubId?: string;
  displayName: string;
  email?: string;
  profilePhoto?: string;
}
//... rest of the file

const UserSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      sparse: true, // This allows multiple users to have a null googleId
      unique: true, // But any googleId that exists must be unique
    },
    githubId: {
      type: String,
      sparse: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      sparse: true, // Not all providers may give an email
    },
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;