# Бэкенд дипломного проекта

Проект сделан в рамках обучения в Яндекс Практикуме.

## Реализована работа сервера:
- регистрация и авторизация пользователей;
- проверка токена;
- создание и удаление карточек фильмов.

## Технологии
`Express.js` `Mongo DB`

## Директории
`/models` — папка с файлами описания схем пользователя и карточки;  
`/controllers` — папка с файлами контроллеров пользователя и карточки;  
`/routes` — папка с файлами роутера;  
`/middlewares` — папка c middleware: auth, cors, limiter, logger, validate;  
`/errors` — папка с классами ошибок.  

## Роуты
`POST /signup` — создаёт пользователя с переданными в теле email, password и name;  
`POST /signin` — проверяет переданные в теле почту и пароль, а затем возвращает JWT;  
`GET /users/me` — возвращает информацию о пользователе (email и имя);  
`PATCH /users/me` — обновляет информацию о пользователе (email и имя);  
`GET /movies` — возвращает все сохранённые текущим  пользователем фильмы;  
`POST /movies` — создаёт фильм с переданными в теле данными;  
`DELETE /movies/:movieId` — удаляет сохранённый фильм по id.  

## Авторизация и регистрация пользователя
- В схеме пользователя есть обязательные поля email и password;
- Поле email уникальное — есть опция unique: true;
- Поле password не ограничено в длину, так как пароль хранится в виде хеша;
- В контроллере createUser почта и хеш пароля записываются в базу;
- Контроллер login проверяет полученные в теле запроса почту и пароль;
- Если почта и пароль верные, контроллер login создаёт JWT, в payload которого записано свойство _id с идентификатором пользователя;
- JWT-токен выпускается на срок 7 дней, а не даётся бессрочно;
- В ответ на успешную авторизацию контроллер login возвращает клиенту созданный токен;
- В файле middlewares/auth.js middleware авторизации для проверки JWT;
- Пользователь не может удалить карточку, которую он не создавал;
- Пользователь не может редактировать чужой профиль;
- API не возвращает хеш пароля;
- Все роуты, кроме /signin и /signup защищены авторизацией.

## Валидация данных
- Поле email пользователя валидируется на соответствие паттерну почты;
- Тела запросов и, где необходимо, параметры запроса и заголовки валидируются по определённым схемам с помощью celebrate;
- Если запрос не соответствует схеме, обработка не передаётся контроллеру, клиент получает ошибку валидации;

## Обработка ошибок в приложении
Для ошибок созданы классы конструкторы ошибок, наследуемые от Error.
Если в любом из запросов что-то идёт не так, сервер возвращает ответ с ошибкой и соответствующим ей статусом:

`400` — переданы некорректные данные в методы создания карточки, пользователя или обновления профиля;  
`401` — передан неверный логин или пароль. Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT;  
`403` — попытка удалить чужую карточку;  
`404` — карточка или пользователь не найден или был запрошен несуществующий роут;  
`409` — при регистрации указан email, который уже существует на сервере;  
`500` — ошибка по умолчанию. Сопровождается сообщением: «На сервере произошла ошибка».  

При обработке ошибки в блоке catch они не выбрасываются через throw, а передаются в централизованный обработчик ошибок с помощью next.

## Сбор логов
- Все запросы и ответы записываются в файл request.log;
- Все ошибки записываются в файл error.log;
- Файлы логов не добавляются в репозиторий.

## Запуск проекта
- Клонировать репозиторий: `git clone https://github.com/uladzimirfilipau/movies-explorer-api.git`  
- Установить зависимости в корневой директории проекта с помощью команды: `npm i` 
- Запустить backend часть приложения на 3001 порту: `npm start`
