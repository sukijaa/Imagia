import mongoose from 'mongoose';
import { MONGO_URI } from './config/keys';

const connectDB = async () => {
  try {
    // Set strictQuery to false to suppress the warning (Mongoose 7+)
    mongoose.set('strictQuery', false); 
    
    const conn = await mongoose.connect(MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred during DB connection');
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;