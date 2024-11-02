// src/main/database.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/bookmarkly';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if unable to connect
  }
};

export default connectDB;
