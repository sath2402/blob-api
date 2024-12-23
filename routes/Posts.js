const express = require('express');
const Post = require('../models/Post'); // Ensure this path is correct
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author_id } = req.body;
    const post = await Post.create({
      title,
      content,
      author_id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

module.exports = router;
