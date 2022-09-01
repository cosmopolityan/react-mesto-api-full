const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const validator = require('validator');
const UnauthorizedError = require('../utils/unauthorized');

const stringLength = {
  type: String,
  minlength: 2,
  maxlength: 30,
};

const validate = require('../utils/validate');

const userSchema = new mongoose.Schema(
  {
    name: {
      ...stringLength,
      required: 'Имя пользователя',
      default: 'Жак-Ив Кусто',
    },
    about: {
      ...stringLength,
      required: 'Описание',
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: 'Аватар',
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => /^https?:\/\/[www.]?[a-z0-9\D]{1,}\.[ru|net][a-z\D]{0,}#?/gi.test(v),
        message: 'Укажите ссылку на изображение',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validate.email,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверный логин и/или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неверный логин и/или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
