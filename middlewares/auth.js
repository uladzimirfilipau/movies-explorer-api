const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { AUTH_ERR_MESSAGE } = require('../utils/const');

const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(AUTH_ERR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError(AUTH_ERR_MESSAGE));
  }
  req.user = payload;
  return next();
};
