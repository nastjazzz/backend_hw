import express from 'express';
import books from './books.js';
import {
  addNewBook,
  findBookById,
  findBookIndex,
  isObjEmpty,
} from './utils.js';

const port = 3000;
const app = express();
const jsonParser = express.json();

const loginAnswer = { id: 1, mail: 'test@mail.ru' };

app.get('/', (req, res) => {
  res.send(`API Running on the port ${port}`);
});

app.post('/api/user/login', (req, res) => {
  res.status(201).send(loginAnswer);
});

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.post('/api/books', jsonParser, (req, res) => {
  if (isObjEmpty(req.body))
    res.status(400).send('Нет данных для создания книги!');

  const requestData = req.body;
  const newBook = addNewBook(requestData, books);
  res.send(newBook);
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const foundBook = findBookById(id, books);

  foundBook
    ? res.send(foundBook)
    : res.status(404).send('Сорян, нет книги с таким id');
});

app.put('/api/books/:id', jsonParser, (req, res) => {
  if (isObjEmpty(req.body))
    res.status(400).send('Нет данных для редактирования книги!');

  const { id } = req.params;
  const requestData = req.body;

  const foundId = findBookIndex(id, books);

  if (foundId !== -1) {
    books[foundId] = { ...books[foundId], ...requestData };
    res.send('Отредактировано!');
  } else {
    res.status(404).send('Сорян, нет книги с таким id');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const foundId = findBookIndex(id, books);

  if (foundId !== -1) {
    books.splice(foundId, 1);
    res.send('ok');
  } else {
    res.status(404).send('Сорян, нет книги с таким id');
  }
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
