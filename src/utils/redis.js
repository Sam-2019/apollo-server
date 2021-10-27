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
  if (!key && !name && !email) return console.error("Can't write redis");
  if (key && name && email) redisClient.hset(key, name, email);
}

writeRedis();

module.exports = { redisClient, writeRedis };
