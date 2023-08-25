const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(/^((http|https):\/\/)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,5}(\/[a-zA-Z0-9-_.~:/?#[\]@!$&'()*+,;=]*)?$/).required(),
    trailerLink: Joi.string().regex(/^((http|https):\/\/)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,5}(\/[a-zA-Z0-9-_.~:/?#[\]@!$&'()*+,;=]*)?$/).required(),
    thumbnail: Joi.string().regex(/^((http|https):\/\/)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,5}(\/[a-zA-Z0-9-_.~:/?#[\]@!$&'()*+,;=]*)?$/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
