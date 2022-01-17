const { Book, Author } = require('../db/models');

class BookHandler {
  createAllBooks(rawBooks) {
    return rawBooks.reduce((acc, item) => {
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
  }

  async getAllBooks() {
    try {
      const rawBooks = await Book.findAll({
        include: {
          association: 'BooksAuthors',
          through: {
            attributes: [],
          },
        },
      });
      return this.createAllBooks(rawBooks);
    } catch (err) {
      console.log('Ошибка в getAllBooks', err);
    }
  }

  async getBookById(id) {
    try {
      const book = await Book.findOne({
        where: { id },
        include: {
          association: 'BooksAuthors',
        },
      });

      return {
        id: book.id,
        title: book.title,
        description: book.description,
        cover: book.cover,
        authors: book.BooksAuthors[0].name,
      };
    } catch (err) {
      console.log('Ошибка в getBookById', err);
      return -1;
    }
  }

  async createNewBook({ title, authors, description, file }) {
    try {
      const [author] = await Author.findOrCreate({ where: { name: authors } });
      const newBook = await Book.create({
        title,
        description,
        cover: file && `/uploads/${file}`,
      });
      await newBook.setBooksAuthors(author.id);
      // console.log(JSON.stringify(newBook, null, 2));
      return newBook.id;
    } catch (err) {
      console.log('Ошибка в createNewBook', err);
      return -1;
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
      console.log('Ошибка в updateBookById', err);
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
      return this.createAllBooks(foundRawBooks);
    } catch (err) {
      console.log('Ошибка в getBooksByAuthor', err);
      return -1;
    }
  }
}

module.exports = BookHandler;
