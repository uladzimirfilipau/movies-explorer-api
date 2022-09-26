const {
  NODE_ENV = 'dev',
  JWT_SECRET = 'dev-secret',
  SALT = 10,
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/filmsdb',
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  SALT,
  PORT,
  MONGODB,
};