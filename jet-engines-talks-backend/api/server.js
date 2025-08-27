 const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// IMPORTANT: Use the correct relative paths to go up one directory
const postRoutes = require('../routes/postRoutes.js');
const userRoutes = require('../routes/userRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- Define Routes ---
app.get('/api', (req, res) => {
  res.send('API is running successfully.');
});
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// --- Define Port ---
const PORT = process.env.PORT || 5001;

// --- New, More Robust Connection and Server Start ---
const startServer = async () => {
  try {
    // 1. First, try to connect to the database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');

    // 2. ONLY if the database connection is successful, then start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    // If the database connection fails, log the error and stop everything
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

// --- Call the function to start the server ---
startServer();

// --- Export the app for Vercel (this does not affect local development) ---
module.exports = app;