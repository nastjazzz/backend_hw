const { Sequelize } = require('sequelize');
// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:');
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db_data/database.sqlite',
});

module.exports = sequelize;
