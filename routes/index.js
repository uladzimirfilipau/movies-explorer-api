const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERR_MESSAGE } = require('../utils/const');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR_MESSAGE));
});

module.exports = router;
