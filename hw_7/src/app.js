const path = require('path');
const express = require('express');
const Book = require('./Book.js');
const storage = require('./multer.js');

const app = express();
const port = 3000;
const book = new Book();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname + '/public')));

// главная страница
app.get('/', (req, res) => {
  res.render('main');
});

// просмотр списка всех книг
app.get('/books', (req, res) => {
  const allBooks = book.getAllBooks();
  res.render('books', { allBooks });
});

// просмотр конкретной книги
app.get('/book/:id', (req, res) => {
  const { id } = req.params;
  const foundBook = book.getBookById(id);
  res.render('view', { foundBook });
});

// создание книги
app.get('/create', (req, res) => {
  res.render('create', {});
});

// редактирование книги
app.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const requestData = req.body;

  const foundBook = book.getBookById(id);
  res.render('update', { foundBook });
});

app.post('/api', storage.single('someFile'), (req, res) => res.json('ok'));

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
