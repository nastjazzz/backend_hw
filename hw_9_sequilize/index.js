const path = require('path');
const express = require('express');
const upload = require('./src/multer.js');
const Book = require('./src/Book.js');

const app = express();
const port = 8080;

const book = new Book();

const jsonParser = express.json();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// главная страница
app.get('/', (req, res) => {
  res.render('pages/main');
});

// просмотр списка всех книг
app.get('/books', async (req, res) => {
  const allBooks = await book.getAllBooks();
  res.render('pages/books', { allBooks });
});

// просмотр конкретной книги
app.get('/book/:id', async (req, res) => {
  const { id } = req.params;
  const foundBook = await book.getBookById(id);

  if (foundBook === -1)
    return res.status(404).json({ error: 'нет книги с таким id' });

  res.render('pages/view', { book: foundBook });
});

// просмотр формы для создания книги
app.get('/create', (req, res) => {
  res.render('pages/create');
});

// просмотр формы для редактирования книги
app.get('/update/:id', async (req, res) => {
  const { id } = req.params;

  const foundBook = await book.getBookById(id);
  if (foundBook === -1)
    return res.status(404).json({ error: 'нет книги с таким id' });
  res.render('pages/update', { book: foundBook });
});

// поиск
app.get('/search', async (req, res) => {
  const query = req.query;
  console.log(req.query);

  if (!Object.keys(query).length) res.render('pages/search');
  else {
    const books = await book.getBooksByAuthor(query);

    if (books === -1)
      res.status(404).json({ error: 'Произошла ошибка при поиске :(' });
    else {
      res.render('pages/search', { books });
    }
  }
});

// создание книги
app.post('/api/books', upload.single('file'), async (req, res) => {
  const requestData = req.body;

  const id = await book.createNewBook({
    ...requestData,
    file: req?.file?.filename,
  });
  res.send({ id });
});

// редактирование книги
app.put('/api/book/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  const requestData = req.body;

  const foundId = await book.updateBookById(id, {
    ...requestData,
    file: req?.file?.filename,
  });

  if (foundId === -1)
    res.status(404).json({ error: 'Не получилось отредактировать книгу' });

  res.send({ id: foundId });
});

app.post('/api/search', upload.none(), async (req, res) => {
  const requestData = req.body;
  console.log({ requestData });

  const books = await book.getBooksByAuthor({ ...requestData });

  if (books === -1)
    res.status(404).json({ error: 'Произошла ошибка при поиске :(' });

  // res.render('pages/search-result', { books });
  // console.log(books);
});

// app.get('/search/?params', upload.none(), async (req, res) => {
//   const params = req.params;
//   const requestData = req.body;
//   console.log('&&&&&&&&&&&&&&&&&&&&&&&77', { requestData, params });

//   // const books = await book.getBooksByAuthor({ ...requestData });

//   // if (books === -1)
//   //   res.status(404).json({ error: 'Произошла ошибка при поиске :(' });

//   // res.render('pages/search-result', { books });
//   // console.log(books);
// });

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
