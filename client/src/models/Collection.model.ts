// This defines the shape of a single image within the collection
export interface IImage {
  _id: string; // Mongoose adds this
  id: string; // The Unsplash ID
  url: string; 
  alt: string;
}

// This is the main Collection interface
export interface ICollection {
  _id: string;
  user: string; // On the backend this is an ObjectId, on the frontend it's a string
  title: string;
  description?: string;
  images: IImage[];
  isPublic: boolean;
  likes: string[]; // An array of user ID strings
  createdAt: string; // Mongoose adds this
  updatedAt: string; // Mongoose adds this
}