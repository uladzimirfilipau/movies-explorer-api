const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const {
  CONFLICT_ERR_MESSAGE,
  BAD_REQ_ERR_MESSAGE,
  WRONG_DATA_ERR_MESSAGE,
  USER_NOT_FOUND_ERR_MESSAGE,
  NOT_UPDATE_ERR_MESSAGE,
} = require('../utils/const');
const { SALT, JWT_SECRET } = require('../utils/config');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, SALT)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((newUser) => res.send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(CONFLICT_ERR_MESSAGE));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(BAD_REQ_ERR_MESSAGE));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError(WRONG_DATA_ERR_MESSAGE));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(USER_NOT_FOUND_ERR_MESSAGE)))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError(USER_NOT_FOUND_ERR_MESSAGE)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(NOT_UPDATE_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
