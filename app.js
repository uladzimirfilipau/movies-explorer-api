require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const limiter = require('./middlewares/limiter');

const mongoDB = 'mongodb://localhost:27017/filmsdb';
const handleError = require('./errors/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors);
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listen port: ${PORT}`);
});