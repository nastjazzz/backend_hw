const errorHandler = (res, statusCode, error) => {
  res.status(statusCode);
  res.send(error);
};

module.exports = { errorHandler };
