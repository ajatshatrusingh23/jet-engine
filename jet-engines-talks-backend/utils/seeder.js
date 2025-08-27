 const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Post = require('../models/Post.js');
// We need the User model to potentially link authors, but for now we'll keep it simple.
// const User = require('../models/User.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --- FIX IS HERE ---
// The data now matches our new Post model structure.
// 'likes' and 'comments' are empty arrays, and 'numComments' is set.
const postsToSeed = [
  {
    authorName: 'Molly Burke',
    time: '14m ago',
    title: 'Advancements in Materials',
    content: 'Use of advanced materials to reduce engine weight and increase durability.',
    likes: [], // Was the number 14
    comments: [], // Was the number 43
    numComments: 0,
  },
  {
    authorName: 'Jane Smith',
    time: '9m ago',
    title: 'Maintenance Best Practices',
    content: 'Regular inspections, component replacements, and more for performance monitoring.',
    likes: [], // Was the number 3
    comments: [], // Was the number 23
    numComments: 0,
  },
  {
    authorName: 'John Doe',
    time: '4m ago',
    title: 'New-Turbofan Engine Design',
    content: 'A new high-bypass-turbofan engine designed for fuel efficiency and reduced-emissions.',
    likes: [], // Was the number 12
    comments: [], // Was the number 12
    numComments: 0,
  }
];

const connectDBAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    await Post.deleteMany();
    console.log('Existing posts cleared.');

    await Post.insertMany(postsToSeed);
    console.log('Data seeded successfully!');
    
    process.exit();

  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

connectDBAndSeed();