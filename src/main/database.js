// src/main/database.js

// Import mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment.
import mongoose from 'mongoose';

// Define the MongoDB URI (Uniform Resource Identifier) that specifies the location of the database.
// In this case, it points to a locally hosted MongoDB instance with a database named 'bookmarkly'.
const MONGODB_URI = 'mongodb://localhost:27017/bookmarkly';

// Asynchronously connects to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database with connection options.
    // - useNewUrlParser: This option uses the new MongoDB driver's connection string parser.
    // - useUnifiedTopology: This option enables the new unified topology layer.
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Log success message upon a successful connection.
    console.log('MongoDB connected successfully');
  } catch (err) {
    // Log error message if the connection to MongoDB fails.
    console.error('Error connecting to MongoDB:', err);
    // Exit the process if the connection fails to avoid running the application without a database connection.
    process.exit(1);
  }
};

// Export the connectDB function so that it can be imported and used in other files to establish a MongoDB connection.
export default connectDB;
