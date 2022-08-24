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

router.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
router.post('/', validateCreateMovie, createMovie); // создаёт фильм
router.patch('/:movieId', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
