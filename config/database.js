const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Raghav@12345', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
