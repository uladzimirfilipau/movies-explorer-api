const url = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const WRONG_EMAIL = 'Неверный формат ссылки';
const WRONG_URL = 'Неверный формат Email';
const WRONG_URL_OR_EMAIL = 'Неправильные почта или пароль';

const NOT_FOUND_ERR_MESSAGE = 'Страница по указанному маршруту не найдена';
const AUTH_ERR_MESSAGE = 'При авторизации произошла ошибка';

const CONFLICT_ERR_MESSAGE = 'Пользователь с таким email уже существует';
const BAD_REQ_ERR_MESSAGE = 'При регистрации пользователя произошла ошибка';
const WRONG_DATA_ERR_MESSAGE = 'Вы ввели неправильный логин или пароль';
const USER_NOT_FOUND_ERR_MESSAGE = 'Пользователь по указанному _id не найден';
const NOT_UPDATE_ERR_MESSAGE = 'При обновлении профиля произошла ошибка';

const BAD_DATA_ERR_MESSAGE = 'Переданы некорректные данные для создания карточки фильма';
const CARD_NOT_FOUND_ERR_MESSAGE = 'Карточка фильма с указанным _id не найдена';
const FORBIDDEN_ERR_MESSAGE = 'Можно удалять только свои сохраненные фильмы';
const BAD_DELETE_DATA_ERR_MESSAGE = 'Переданы некорректные данные для удаления карточки фильма';

const CARD_DELETE_MESSAGE = { message: 'Карточка фильма удалена' };

module.exports = {
  url,
  WRONG_EMAIL,
  WRONG_URL,
  WRONG_URL_OR_EMAIL,
  NOT_FOUND_ERR_MESSAGE,
  AUTH_ERR_MESSAGE,
  CONFLICT_ERR_MESSAGE,
  BAD_REQ_ERR_MESSAGE,
  WRONG_DATA_ERR_MESSAGE,
  USER_NOT_FOUND_ERR_MESSAGE,
  NOT_UPDATE_ERR_MESSAGE,
  BAD_DATA_ERR_MESSAGE,
  CARD_NOT_FOUND_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  BAD_DELETE_DATA_ERR_MESSAGE,
  CARD_DELETE_MESSAGE,
};
