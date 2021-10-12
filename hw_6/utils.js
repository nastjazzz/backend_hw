const findBookById = (id, books) => {
  return books.find((book) => Number(id) === Number(book.id));
};

const findBookIndex = (id, books) => {
  return books.findIndex((book) => Number(id) === Number(book.id));
};

const addNewBook = (requestData, books) => {
  const newBookId = books.length + 1;
  const newBook = { id: newBookId, ...requestData };
  books.push(newBook);
  return newBook;
};

const isObjEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0;
};

export { findBookById, findBookIndex, addNewBook, isObjEmpty };
