const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Author = sequelize.define("Author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  cover: {
    type: DataTypes.STRING,
    defaultValue: "http://s003.radikal.ru/i202/1405/45/86a3a577fba4.png",
  },
});

Book.belongsToMany(Author, { through: "Book_Authors", as: 'BooksAuthors' });
Author.belongsToMany(Book, { through: "Book_Authors", as: 'BooksAuthors' });

(async () => {
  await sequelize.sync();
  console.log('======================= Синхронизация прошла! =======================')
})();

// (async () => {
//   try {
//     const newBook = await Book.create(
//       {
//         title: "title_1",
//         description: "description_1",
//         cover: "file",
//         BooksAuthors: 
//           {
//             name: "автор_1",
//           },
//       },
//       {
//         include: {
//           association: 'BooksAuthors'
//         },
//       }
//     );
//     console.log("newBook=====", newBook.BooksAuthors);
//   } catch (err) {
//     console.log("error========", err);
//   }
// })();

module.exports = { Book, Author };
