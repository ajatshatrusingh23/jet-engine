const mongoose = require('mongoose');


const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Link to the User model
      required: true,
      ref: 'User',
    },
    name: {
      type: String, // Store the user's name directly for easy display
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


 const postSchema = new mongoose.Schema({
  authorName: { // We can eventually replace this with a user ref like in comments
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // Likes is now an array of User IDs
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // Comments is now an array of comment objects
  comments: [commentSchema],
  // We can add a simple count for performance if needed
  numComments: {
    type: Number,
    required: true,
    default: 0,
  },
  time: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the model from the schema and export it
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
