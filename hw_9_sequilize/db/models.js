const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const books = require('./books');

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
});

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  cover: {
    type: DataTypes.STRING,
    defaultValue: 'http://s003.radikal.ru/i202/1405/45/86a3a577fba4.png',
  },
});

Book.belongsToMany(Author, { through: 'Book_Authors', as: 'BooksAuthors' });
Author.belongsToMany(Book, { through: 'Book_Authors', as: 'BooksAuthors' });

(async () => {
  await sequelize.sync();
  console.log(
    '======================= Синхронизация прошла! ======================='
  );
})();

(async () => {
  const booksNumber = await Book.count({
    include: { association: 'BooksAuthors' },
  });
  console.log({ booksNumber });
  if (booksNumber === 0) {
    books.forEach(async (book) => {
      const { title, description, authors, cover } = book;
      try {
        await Book.create(
          {
            title,
            description,
            cover,
            BooksAuthors: {
              name: authors,
            },
          },
          {
            include: {
              association: 'BooksAuthors',
            },
          }
        );
      } catch (err) {
        console.log('error========', err);
      }
    });
  }
})();

module.exports = { Book, Author };
