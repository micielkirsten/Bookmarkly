// src/main/models/Bookmark.js

// Import mongoose to define the schema and interact with MongoDB
import mongoose from 'mongoose';

// Define the Bookmark schema, which represents the structure of a bookmark document in MongoDB
const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: String },
  url: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create the Bookmark model based on the schema
// The model represents the collection in MongoDB where the bookmarks are stored
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

// Export the Bookmark model so it can be used in other parts of the application
export default Bookmark;
