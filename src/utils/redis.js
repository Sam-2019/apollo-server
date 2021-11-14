const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./config");
import { mailer } from "./nodemailer";

const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  // password: REDIS_PASSWORD
});

Redis.Command.setReplyTransformer("hgetall", (data) => {
  const arr = [];
  for (let i = 0; i < data.length; i += 2) {
    arr.push({ name: data[i], email: data[i + 1] });
  }
  return arr;
});

function writeRedis(key, name, email) {
  if (!key && !name && !email) return console.error("No data");
  return redisClient.hset(key, name, email);
}

const expireRedisItem = (key, data, response) => {
  if (key === undefined || data === undefined) return console.error("No data");
  if (key.length === 0 || data.length === 0) return console.error("No data");

  if (data.length === response.length) {
    redisClient.expire(key, 600);
    return "Expiration successful";
  }
};

const getEmailsFromRedisAndSend = async (key) => {
  redisClient.hgetall(key, async (err, data) => {
    if (err) return err;
    if (data.length === 0) return null;

    const response = await mailer(data);
    return expireRedisItem(key, data, response);
  });
};

module.exports = {
  redisClient,
  writeRedis,
  expireRedisItem,
  getEmailsFromRedisAndSend,
};
