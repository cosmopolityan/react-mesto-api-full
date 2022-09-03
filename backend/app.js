require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/notfound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { signUpValidation, signInValidation } = require('./middlewares/validation');
const errorsHandler = require('./middlewares/errors');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  family: 4,
});

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(auth);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(
  new NotFoundError('Такой страницы не существует :('),
));

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

// app.use(
//   cors({
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true,
//   }),
// );

app.listen(PORT, () => {
  console.log(`Работает ${PORT} порт`);
});
