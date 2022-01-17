const { Book, Author } = require('../db/models');
const { Op } = require('sequelize');

class BookHandler {
  async getAllBooks() {
    const rawBooks = await Book.findAll({
      include: {
        association: 'BooksAuthors',
        // если мне не нужны данные из junction table,
        // то можно указать доп параметры и они не будут показаны
        through: {
          attributes: [],
        },
      },
    });

    const allBooks = rawBooks.reduce((acc, item) => {
      const { id, title, description, cover, BooksAuthors } = item;

      acc.push({
        id,
        title,
        description,
        cover,
        authors: BooksAuthors[0].name,
      });
      return acc;
    }, []);
    console.log(allBooks);
    return allBooks;
  }

  async getBookById(id) {
    try {
      const book = await Book.findOne({
        where: { id },
        include: {
          association: 'BooksAuthors',
        },
      });
      const bookInfo = {
        id: book.id,
        title: book.title,
        description: book.description,
        cover: book.cover,
        authors: book.BooksAuthors[0].name,
      };

      return bookInfo;
    } catch (err) {
      console.log(err);
      return -1;
    }
  }

  async createNewBook({ title, authors, description, file }) {
    const [author] = await Author.findOrCreate({ where: { name: authors } });
    try {
      const newBook = await Book.create({
        title,
        description,
        cover: file && `/uploads/${file}`,
      });
      await newBook.setBooksAuthors(author.id);
      console.log(JSON.stringify(newBook, null, 2));
      return newBook.id;
    } catch (e) {
      console.log(e);
    }
  }

  async updateBookById(id, { title, authors, description, file }) {
    try {
      const book = await Book.findOne({
        where: { id },
        include: {
          association: 'BooksAuthors',
        },
      });
      const [author] = await Author.findOrCreate({ where: { name: authors } });
      await book.update({
        title,
        description,
        cover: file && `/uploads/${file}`,
      });
      await book.setBooksAuthors(author.id);
      return book.id;
    } catch (err) {
      console.log('Ошибка при обновлении книги', err);
      return -1;
    }
  }

  async getBooksByAuthor({ authors }) {
    try {
      const foundRawBooks = await Book.findAll({
        include: [
          {
            model: Author,
            as: 'BooksAuthors',
            where: {
              name: authors,
            },
          },
        ],
      });
      console.log({ foundRawBooks });

      const books = foundRawBooks.reduce((acc, item) => {
        const { id, title, description, cover, BooksAuthors } = item;

        acc.push({
          id,
          title,
          description,
          cover,
          authors: BooksAuthors[0].name,
        });
        return acc;
      }, []);
      return books;
    } catch (err) {
      console.log('Ошибка в getBooksByAuthor', err);
      return -1;
    }
  }
}

module.exports = BookHandler;
