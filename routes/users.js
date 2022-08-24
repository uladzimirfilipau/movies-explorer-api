const router = require('express').Router();

const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUserInfo,
} = require('../middlewares/validate');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validateUserInfo, updateUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = router;
