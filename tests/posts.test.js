const request = require('supertest');
const app = require('../app'); // Path to your Express app
const { Post } = require('../models'); // Sequelize Post model
const sequelize = require('../config/database'); // Sequelize instance

// Run this before all tests to sync the database and clear tables
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Ensures database schema is up-to-date
});

// Run this after each test to clean up the database
afterEach(async () => {
  await Post.destroy({ where: {} }); // Clean up all posts
});

// Run this after all tests to close the database connection
afterAll(async () => {
  await sequelize.close();
});

describe('Posts API', () => {
  test('GET /posts - should return an empty array when there are no posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Expecting an empty array
  });

  test('POST /posts - should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content',
      author_id: 'some-author-id', // Replace with a valid author_id from your database
    };

    const response = await request(app)
      .post('/posts')
      .send(newPost);

    expect(response.status).toBe(201); // Expecting successful creation
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);

    // Verify post is in the database
    const createdPost = await Post.findByPk(response.body.id);
    expect(createdPost).not.toBeNull();
    expect(createdPost.title).toBe(newPost.title);
  });

  test('GET /posts - should return all posts', async () => {
    // Create a test post
    const post = await Post.create({
      title: 'Another Test Post',
      content: 'Content for another post',
      author_id: 'some-author-id', // Replace with a valid author_id
    });

    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe(post.title);
  });

  test('PUT /posts/:id - should update a post', async () => {
    // Create a test post
    const post = await Post.create({
      title: 'Update Test',
      content: 'Content to be updated',
      author_id: 'some-author-id', // Replace with a valid author_id
    });

    const updatedData = {
      title: 'Updated Title',
      content: 'Updated Content',
    };

    const response = await request(app)
      .put(`/posts/${post.id}`)
      .send(updatedData);

    expect(response.status).toBe(200); // Expecting successful update
    expect(response.body[0]).toBe(1); // Sequelize returns an array with the number of updated rows

    // Verify the update in the database
    const updatedPost = await Post.findByPk(post.id);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.content).toBe(updatedData.content);
  });

  test('DELETE /posts/:id - should delete a post', async () => {
    // Create a test post
    const post = await Post.create({
      title: 'Delete Test',
      content: 'Content to be deleted',
      author_id: 'some-author-id', // Replace with a valid author_id
    });

    const response = await request(app).delete(`/posts/${post.id}`);
    expect(response.status).toBe(204); // Expecting no content

    // Verify the post is removed from the database
    const deletedPost = await Post.findByPk(post.id);
    expect(deletedPost).toBeNull();
  });
});
