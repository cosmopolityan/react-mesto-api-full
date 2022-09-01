const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос'
        : message,
    });
  next();
};

module.exports = errorsHandler;
