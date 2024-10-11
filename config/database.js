const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_db', 'myuser', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;