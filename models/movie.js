const { Schema, model } = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { WRONG_URL } = require('../utils/const');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: [isUrl, WRONG_URL],
    },
    trailerLink: {
      type: String,
      required: true,
      validate: [isUrl, WRONG_URL],
    },
    thumbnail: {
      type: String,
      required: true,
      validate: [isUrl, WRONG_URL],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = model('movie', movieSchema);
