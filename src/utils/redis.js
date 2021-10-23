const Redis = require("ioredis");

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD,
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
