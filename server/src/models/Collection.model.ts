import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.model';

// This defines the shape of a single image within the collection
export interface IImage {
  id: string; // The Unsplash ID
  url: string; // The specific URL we want to save (e.g., urls.regular)
  alt: string; // The alt text
}

// This is the main Collection interface
export interface ICollection extends Document {
  _id: string;
  user: IUser['_id']; // The user who owns this collection
  title: string;
  description?: string;
  images: IImage[];
  isPublic: boolean;
  likes: IUser['_id'][]; // An array of user IDs who liked this
}

// --- Schema Definitions ---

const ImageSchema: Schema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String },
});

const CollectionSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [ImageSchema], // An array of the ImageSchema
    isPublic: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Collection = mongoose.model<ICollection>('Collection', CollectionSchema);
export default Collection;