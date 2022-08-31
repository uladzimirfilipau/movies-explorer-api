const router = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUserInfo,
} = require('../middlewares/validate');

// вернуть информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);
// обновить информацию о пользователе (email и имя)
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
