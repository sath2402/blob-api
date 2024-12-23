const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/user');

const router = express.Router();

// Get comments for a specific post
router.get('/:postId', async (req, res) => {
  const comments = await Comment.findAll({ where: { post_id: req.params.postId } });
  res.json(comments);
});

// Add a comment to a post
router.post('/:postId', async (req, res) => {
  const { content, author_id } = req.body;
  const comment = await Comment.create({ content, post_id: req.params.postId, author_id });
  res.status(201).json(comment);
});

// Update a comment
router.put('/:id', async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.update({ content }, { where: { id: req.params.id } });
  res.json(comment);
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = router;
