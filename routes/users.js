const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getActualUser, updateUser } = require('../controllers/users');

router.get('/me', getActualUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
