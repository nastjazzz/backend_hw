const dataBooks = require('./data/books.js');

class Book {
  getAllBooks() {
    return dataBooks;
  }

  findBookById = (id, books) => {
    // const books = this.getAllBooks();
    return books.find((book) => Number(id) === Number(book.id));
  };

  findBookIndex = (id, books) => {
    // const books = this.getAllBooks();
    return books.findIndex((book) => Number(id) === Number(book.id));
  };

  getBookById(id) {
    const books = this.getAllBooks();
    const foundBook = this.findBookById(id, books);
    return foundBook ? foundBook : -1;
  }

  updateBookById(id, { title, authors, description, file }) {
    const books = this.getAllBooks();
    const foundId = this.findBookIndex(id, books);

    if (foundId === -1) return -1;

    books[foundId] = {
      ...books[foundId],
      title,
      authors: [authors],
      description,
      cover: file ? `/uploads/${file}` : books[foundId].cover,
    };
    return foundId + 1;
  }

  createNewBook({ title, authors, description, file }) {
    const books = this.getAllBooks();
    const newBookId = books.length + 1;

    const newBook = {
      id: newBookId,
      title,
      authors: [authors],
      description,
      cover: file ? `/uploads/${file}` : '',
    };
    books.push(newBook);

    return newBookId;
  }
}

module.exports = Book;
