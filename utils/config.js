const {
  NODE_ENV = 'dev',
  JWT_SECRET = 'dev-secret',
  SALT = 10,
  PORT = process.env.PORT || 3001,
  MONGODB = 'mongodb+srv://ulfi:lQEF8JvuqAX0yAWV@cluster0.ozqtuja.mongodb.net/?retryWrites=true&w=majority',
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  SALT,
  PORT,
  MONGODB,
};
