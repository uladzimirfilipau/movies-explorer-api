const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateMovieId,
  validateCreateMovie,
} = require('../middlewares/validate');

// вернуть все сохранённые текущим пользователем фильмы
router.get('/', getMovies);
// создать фильм
router.post('/', validateCreateMovie, createMovie);
// удалить сохранённый фильм по id
router.patch('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
