const express = require('express');
const router = express.Router();
const Post = require('./models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
// const postsRoutes = require('./routes/posts');
// app.use('/posts', postsRoutes);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

