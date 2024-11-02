// src/main/models/Bookmark.js
import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: String },
  url: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;
