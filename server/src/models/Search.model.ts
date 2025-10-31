import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.model'; // Re-use our User interface

export interface ISearch extends Document {
  user: IUser['_id']; // Reference to the User who searched
  term: string;
  timestamp: Date;
}

const SearchSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  term: {
    type: String,
    required: true,
    lowercase: true, // Standardize the data
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Search = mongoose.model<ISearch>('Search', SearchSchema);
export default Search;