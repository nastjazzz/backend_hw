const { findBookById, findBookIndex } = require('./utils.js');
const books = require('./data/books.js');
const errorHandler = require('./server/errorHandler.js');

class Book {
  getAllBooks() {
    return books;
  }

  getBookById(id) {
    const foundBook = findBookById(id, books);

    return foundBook ? foundBook : 'Сорян, нет книги с таким id';
  }

  updateBookById(id) {
    // if (isObjEmpty(req.body))
    //   return errorHandler(res, 400, 'Нет данных для редактирования книги!');

    // const { id } = req.params;
    // const requestData = req.body;

    const foundId = findBookIndex(id, books);

    if (foundId !== -1) {
      books[foundId] = { ...books[foundId], ...requestData };
      // res.send('Отредактировано!');
      return 'Отредактировано!';
    } else {
      return 'Сорян, нет книги с таким id';
    }
  }
}

module.exports = Book;
