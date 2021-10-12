import express from 'express';

import userRouter from './userRouter.js';
import booksRouter from './booksRouter.js';

const app = express();
const port = 8000;

app.use(express.json()); //jsonParser

app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
