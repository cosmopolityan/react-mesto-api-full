const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const errors = require('../utils/errors');
const { names } = require('../utils/errors');
const { messages } = require('../utils/errors');
const { JWT_SECRET } = require('../utils/constants');
const NotFoundError = require('../utils/notfound');
const BadRequestError = require('../utils/badrequest');
const ConflictError = require('../utils/conflicterror');

const options = {
  runValidators: true,
  new: true,
};

module.exports.getUsers = (req, res) => User.find({})
  .then((data) => res.send({ data }))
  .catch(() => res
    .status(errors.codes.serverError)
    .send({ message: errors.messages.default }));

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((data) => {
    if (!data) {
      throw new NotFoundError('Страница не найдена');
    }

    res.send({ data });
  })
  .catch((err) => next(err.name === names.cast ? new BadRequestError('Неверный запрос') : err));

module.exports.getUser = (req, res) => User.findById(req.params.id)
  .then((data) => (data
    ? res.send({ data })
    : res
      .status(errors.codes.notFound)
      .send({ message: errors.messages.castError })))
  .catch((err) => (err.name === errors.names.cast
    ? res
      .status(errors.codes.badRequest)
      .send({ message: errors.messages.castError })
    : res
      .status(errors.codes.serverError)
      .send({ message: errors.messages.default })));

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new ConflictError('Пользователь с таким email уже существует');
        err.statusCode = 409;
        next(err);
        return;
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
          about,
          avatar,
        }))
        .then(({ _id }) => res.status(201).send({
          message: 'Вы зарегистрировались!',
          user: { _id, email },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Введите корректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(errors.codes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(errors.codes.serverError)
          .send({ message: errors.messages.default });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((data) => (data
      ? res.send({ data })
      : res
        .status(errors.codes.notFound)
        .send({ message: errors.messages.castError })))
    .catch((err) => {
      if (err.name === errors.names.validation) {
        return res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.validationError });
      }
      return err.name === errors.names.cast
        ? res
          .status(errors.codes.badRequest)
          .send({ message: errors.messages.castError })
        : res
          .status(errors.codes.serverError)
          .send({ message: errors.messages.default });
    });
};

const tokenExpiration = { days: 7 };
tokenExpiration.sec = 60 * 60 * 24 * tokenExpiration.days;
tokenExpiration.ms = 1000 * tokenExpiration.sec;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: tokenExpiration.sec },
      );
      res
        .cookie('jwt', token, {
          maxAge: tokenExpiration.ms,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: messages.ok });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
