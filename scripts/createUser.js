const sequelize = require('../config/database'); // Ensure this path is correct
const User = require('../models/User'); // Ensure this path is correct

const createUser = async () => {
  try {
    await sequelize.authenticate(); // Test database connection
    console.log('Connection has been established successfully.');

    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close(); // Close connection
  }
};

createUser();
