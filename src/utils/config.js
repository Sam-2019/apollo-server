const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_NAME = process.env.USER_EMAIL;
const RECEPIENTS_EMAIL = process.env.RECEPIENTS_EMAIL;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const DB_URI = process.env.DB_URI;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  USER_EMAIL,
  USER_NAME,
  RECEPIENTS_EMAIL,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  DB_URI,
};