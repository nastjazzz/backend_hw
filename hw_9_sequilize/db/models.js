const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Author = sequelize.define('Author', {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  cover: {
    type: DataTypes.STRING,
    defaultValue: 'http://s003.radikal.ru/i202/1405/45/86a3a577fba4.png',
  },
});

Book.belongsToMany(Author, { through: 'BookAuthors', as: 'Authors' });
Author.belongsToMany(Book, { through: 'BookAuthors', as: 'Books' });

(async () => {
  await sequelize.sync();
})();

module.exports = Book;
