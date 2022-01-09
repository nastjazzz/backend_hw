const BookModel = require('../db/models');

class Book {
  async getAllBooks() {
    const rawBooks = await BookModel.findAll();
    console.log('rawBooks===========', rawBooks);

    const allBooks = [];
    rawBooks.forEach((book) => allBooks.push(book.dataValues));
    return allBooks;
  }

  findBookById = (id, books) => {
    return books.find((book) => Number(id) === Number(book.id));
  };

  async getBookById(id) {
    const foundBook = await BookModel.findOne({ where: { id: id } });
    return foundBook ? foundBook : -1;
  }

  async createNewBook({ title, authors, description, file }) {
    console.log('createNewBook', { title, authors, description });

    const newBook = await BookModel.create({
      title,
      description,
      cover: file,
    });

    console.log('createNewBook', newBook.id, newBook);
    return newBook.id;
  }

  // async updateBookById(id, { title, authors, description, file }) {
  //   await BookModel.update(
  //     { title, authors, description, cover: file },
  //     {
  //       where: {
  //         id,
  //       },
  //     }
  //   );
  //   return id;
  // }
}

module.exports = Book;
