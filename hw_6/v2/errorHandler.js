const errorHandler = (res, statusCode, error) => {
  res.status(statusCode);
  res.send(error);
};

export default errorHandler;
