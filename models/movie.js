const { Schema, model } = require('mongoose');
const isUrl = require('validator/lib/isURL');

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
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    trailerLink: {
      type: String,
      required: true,
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    thumbnail: {
      type: String,
      required: true,
      validate: [isUrl, 'Неверный формат ссылки'],
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
