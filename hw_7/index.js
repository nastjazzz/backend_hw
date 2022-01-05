const path = require('path');
const express = require('express');
const upload = require('./src/multer.js');
const Book = require('./src/Book.js');

const app = express();
const port = 3000;

const book = new Book();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// главная страница
app.get('/', (req, res) => {
  res.render('pages/main');
});

// просмотр списка всех книг
app.get('/books', (req, res) => {
  const allBooks = book.getAllBooks();
  res.render('pages/books', { allBooks });
});

// просмотр конкретной книги
app.get('/book/:id', (req, res) => {
  const { id } = req.params;
  const foundBook = book.getBookById(id);

  if (foundBook === -1) return res.status(404).send('нет книги с таким id');
  res.render('pages/view', { book: foundBook });
});

// просмотр формы для создания книги
app.get('/create', (req, res) => {
  res.render('pages/create', {});
});

// просмотр формы для редактирования книги
app.get('/update/:id', (req, res) => {
  const { id } = req.params;

  const foundBook = book.getBookById(id);
  if (foundBook === -1) return res.status(404).send('нет книги с таким id');
  res.render('pages/update', { book: foundBook });
});

// создание книги
app.post('/api/books', upload.single('file'), (req, res) => {
  const requestData = req.body;

  const id = book.createNewBook({
    ...requestData,
    file: req?.file?.filename,
  });
  res.send({ id });
});

// редактирование книги
app.put('/api/book/:id', upload.single('file'), (req, res) => {
  const { id } = req.params;
  const requestData = req.body;

  const foundId = book.updateBookById(id, {
    ...requestData,
    file: req?.file?.filename,
  });
  res.send({ id: foundId });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
