import express from 'express';
const booksRouter = express.Router();

import books from '../books.js';
import {
  addNewBook,
  findBookById,
  isObjEmpty,
  findBookIndex,
} from '../utils.js';

import errorHandler from './errorHandler.js';

booksRouter.use((req, res, next) => {
  console.log('Request time: ', new Date().toLocaleString('RU-ru'));
  next();
});

const getAllBooks = (req, res) => {
  res.send(books);
};

const createNewBook = (req, res) => {
  if (isObjEmpty(req.body))
    return errorHandler(res, 400, 'Нет данных для создания книги!');

  const requestData = req.body;
  const newBook = addNewBook(requestData, books);
  res.send(newBook);
};

const getBookById = (req, res) => {
  const { id } = req.params;
  const foundBook = findBookById(id, books);

  foundBook
    ? res.send(foundBook)
    : errorHandler(res, 404, 'Сорян, нет книги с таким id');
};

const updateBookById = (req, res) => {
  if (isObjEmpty(req.body))
    return errorHandler(res, 400, 'Нет данных для редактирования книги!');

  const { id } = req.params;
  const requestData = req.body;

  const foundId = findBookIndex(id, books);

  if (foundId !== -1) {
    books[foundId] = { ...books[foundId], ...requestData };
    res.send('Отредактировано!');
  } else {
    errorHandler(res, 404, 'Сорян, нет книги с таким id');
  }
};

const deleteBookById = (req, res) => {
  const { id } = req.params;
  const foundId = findBookIndex(id, books);

  if (foundId !== -1) {
    books.splice(foundId, 1);
    res.send('ok');
  } else {
    errorHandler(res, 404, 'Сорян, нет книги с таким id');
  }
};

booksRouter.route('/').get(getAllBooks).post(createNewBook);
booksRouter
  .route('/:id')
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);

export default booksRouter;
