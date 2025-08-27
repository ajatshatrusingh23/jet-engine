 const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const { protect } = require('../middleware/authMiddleware.js');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new post
router.post('/', protect, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      authorName: req.user.name,
      time: 'Just now',
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT a like on a post
router.put('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.find(like => like.toString() === req.user._id.toString())) {
      post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new comment on a post
router.post('/:id/comments', protect, async (req, res) => {
  // Make sure we are correctly getting 'text' from the body
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment text cannot be empty' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      user: req.user._id,
      name: req.user.name,
      text: text,
    };

    post.comments.unshift(newComment);
    post.numComments = post.comments.length;
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error); // Log the specific error on the backend
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;