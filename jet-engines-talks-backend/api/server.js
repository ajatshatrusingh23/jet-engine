 const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import mongoose
const postRoutes = require('../routes/postRoutes.js');
const userRoutes = require('../routes/userRoutes.js');

dotenv.config();
const app = express();

// --- New Database Connection Logic ---
const connectDB = async () => {
  try {
    console.log('Server is trying to connect to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Call the function to connect to the DB
// ------------------------------------

app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Jet Engines Talks API is running!</h1>');
});

const PORT = process.env.PORT || 5001; // Using 5001 from our last step

 module.exports = app;