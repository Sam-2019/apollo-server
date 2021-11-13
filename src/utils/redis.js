const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./config");

const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  // password: REDIS_PASSWORD
});

Redis.Command.setReplyTransformer("hgetall", (result) => {
  const arr = [];
  for (let i = 0; i < result.length; i += 2) {
    arr.push({ name: result[i], email: result[i + 1] });
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

const getEmailsFromRedisAndSend = (key) => {
  redisClient.hgetall(key, async (err, result) => {
    if (err) return err;
    if (result.length === 0) return null;

    return mailer(result, key);
  });
};

module.exports = {
  redisClient,
  writeRedis,
  expireRedisItem,
  getEmailsFromRedisAndSend,
};
