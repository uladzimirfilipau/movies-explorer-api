const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/AuthError');
const { WRONG_EMAIL, WRONG_URL_OR_EMAIL } = require('../utils/const');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, WRONG_EMAIL],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(WRONG_URL_OR_EMAIL));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(WRONG_URL_OR_EMAIL));
        }
        return user;
      });
    });
};

module.exports = model('user', userSchema);
