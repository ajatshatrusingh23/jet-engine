const express = require('express');
const router = express.Router();
const User = require('../models/User.js'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will be valid for 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
  // 1. Get name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // 2. Check if a user with that email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // If the user exists, send a 400 error (Bad Request)
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. If user doesn't exist, create a new user in the database
    const user = await User.create({
      name,
      email,
      password, // The password will be automatically hashed by the code in our User.js model!
    });

    // 4. If the user was created successfully, send back some user info
    if (user) {
      res.status(201).json({ // 201 means "Created"
        _id: user._id,
        name: user.name,
        email: user.email,
        // We will add a token here in the next step
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. If user exists AND the password matches, send back user data and token
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // Generate and include the token
      });
    } else {
      // If user doesn't exist or password doesn't match, send an error
      res.status(401).json({ message: 'Invalid email or password' }); // 401 means "Unauthorized"
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;