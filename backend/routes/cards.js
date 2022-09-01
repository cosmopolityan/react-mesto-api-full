const cardRouter = require('express').Router();

const { cardValidation, idValidation } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', cardValidation, createCard);
cardRouter.delete('/cards/:cardId', idValidation('cardId'), deleteCard);
cardRouter.put('/cards/:cardId/likes', idValidation('cardId'), likeCard);
cardRouter.delete('/cards/:cardId/likes', idValidation('cardId'), dislikeCard);

module.exports = cardRouter;
