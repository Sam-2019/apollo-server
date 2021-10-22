const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const redisDemo = async () => {
  const reply = await redis.get("foo");
  console.log(reply);
};

redisDemo();

module.export = redis;
