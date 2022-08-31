const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  BAD_DATA_ERR_MESSAGE,
  CARD_NOT_FOUND_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  BAD_DELETE_DATA_ERR_MESSAGE,
  CARD_DELETE_MESSAGE,
} = require('../utils/const');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_DATA_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(CARD_NOT_FOUND_ERR_MESSAGE));
      } else if (req.user._id !== movie.owner.toString()) {
        next(new ForbiddenError(FORBIDDEN_ERR_MESSAGE));
      } else {
        movie.remove()
          .then(() => res.send(CARD_DELETE_MESSAGE))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_DELETE_DATA_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
