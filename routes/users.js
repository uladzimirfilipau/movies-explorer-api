const router = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUserInfo,
} = require('../middlewares/validate');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
