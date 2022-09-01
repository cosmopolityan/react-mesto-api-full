const userRouter = require('express').Router();

const { userNameValidation, userAboutValidation, userAvatarValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', userNameValidation, getUser);
userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', userAboutValidation, updateUser);
userRouter.patch('/users/me/avatar', userAvatarValidation, updateUserAvatar);

module.exports = userRouter;
