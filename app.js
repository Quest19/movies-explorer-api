const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const routerUser = require('./routes/users');
const routerMovie = require('./routes/movies');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS } = require('./config');

const { PORT = 4000 } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', routerUser);
app.use('/movies', routerMovie);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такого пути нет'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
