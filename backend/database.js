const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize_tute', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
