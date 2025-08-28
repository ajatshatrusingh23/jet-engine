 const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Relative paths to find the routes from within the /api directory
const postRoutes = require('../routes/postRoutes.js');
const userRoutes = require('../routes/userRoutes.js');

// Initialize dotenv to load environment variables
dotenv.config();

// Create the Express app instance
const app = express();

// --- Apply Middleware ---
app.use(cors());
app.use(express.json());

// --- Define API Routes ---
app.get('/api', (req, res) => {
  res.send('API is running successfully.');
});
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// --- Connection and Server Start Logic ---
const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in your .env file');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

// This is the key: We only listen if the file is run directly (local development)
// Vercel imports this file as a module, so this `if` block will not run on Vercel.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running for local development on http://localhost:${PORT}`);
  });
}

// --- Start the database connection ---
startServer();

// --- Export the app for Vercel ---
// This is what Vercel uses. It ignores the app.listen() block.
module.exports = app;