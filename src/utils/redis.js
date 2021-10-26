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

function writeRedis(name, email) {
  if (name) redisClient.hset("h3", name, email);
}

writeRedis();

module.exports = { redisClient, writeRedis };
