const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../utils/unauthorized');
const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new UnauthorizedError('Пожалуйста, авторизуйтесь');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Пожалуйста, авторизуйтесь');
  }

  req.user = payload;
  next();
};
