const { Book, Author } = require("../db/models");

class BookHandler {
  async getAllBooks() {
    const rawBooks = await Book.findAll({
      include: {
        association: "BooksAuthors",
      },
    });

    const allBooks = rawBooks.reduce((acc, item) => {
      const bookInfo = {
        id: item.dataValues.id,
        title: item.dataValues.title,
        description: item.dataValues.description,
        cover: item.dataValues.cover,
        // какая-то хрень((
        authors: item.BooksAuthors[0].dataValues.name,
      };

      console.log("bookInfo=======", bookInfo);

      acc.push(bookInfo);
      return acc;
    }, []);
    return allBooks;
  }

  findBookById = (id, books) => {
    return books.find((book) => Number(id) === Number(book.id));
  };

  async getBookById(id) {
    const foundBook = await Book.findOne({
      where: { id },
      include: {
        association: "BooksAuthors",
      },
    });

    const bookInfo = {
      id: foundBook.dataValues.id,
      title: foundBook.dataValues.title,
      description: foundBook.dataValues.description,
      cover: foundBook.dataValues.cover,
      // какая-то хрень((
      authors: foundBook.BooksAuthors[0].dataValues.name,
    };

    console.log("####################################\n", bookInfo);

    return foundBook ? bookInfo : -1;
  }

  async createNewBook({ title, authors, description, file }) {
    const newBook = await Book.create(
      {
        title,
        description,
        cover: file,
        BooksAuthors: {
          name: authors,
        },
      },
      {
        include: {
          association: "BooksAuthors",
        },
      }
    );
    return newBook.id;
  }

  async updateBookById(id, { title, authors, description, file }) {
    await Book.update(
      { title, description, cover: file, BooksAuthors: { name: authors } },
      {
        where: {
          id,
        },
      },
      {
        include: {
          association: "BooksAuthors",
        },
      }
    );

    console.log(bookInfo);
    return id;
  }
}

module.exports = BookHandler;
