const Redis = require("ioredis");
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  REDIS_USERNAME,
  NODE_ENV,
  REDIS_HOST_LOCAL,
  REDIS_PORT_LOCAL,
  REDIS_PASSWORD_LOCAL,
} = require("../utils/config");
const { mailer } = require("./nodemailer");

const redisClient = new Redis({
  host: NODE_ENV === "production" ? REDIS_HOST : REDIS_HOST_LOCAL,
  port: NODE_ENV === "production" ? REDIS_PORT : REDIS_PORT_LOCAL,
  password: NODE_ENV === "production" ? REDIS_PASSWORD : null,
  username: NODE_ENV === "production" ? REDIS_USERNAME : null,
});

Redis.Command.setReplyTransformer("hgetall", async (data) => {
  if (data.length === 0) return console.error({ transformer: "No data" });

  const arr = [];

  try {
    for (let i = 0; i < data.length; i += 2) {
      arr.push({ name: data[i], email: data[i + 1] });
    }

    return arr;
  } catch (error) {
    console.log(error);
  }
});

function writeRedis(key, name, email) {
  if (!key || !name || !email) return console.error({ writeRedis: "No data" });
  return redisClient.hset(key, name, email);
}

const expireRedisItem = (key, data, response) => {
  if (response.length === 0) return console.error({ expireRedis: "No data" });

  if (!key || !data || !response)
    return console.error({ expireRedis: "No data" });

  if (data.length === response.length) {
    redisClient.expire(key, 600);
    return console.log("Expiration successful");
  }
};

const getEmailsFromRedisAndSend = (key) => {
  if (!key) return console.log({ getEmails: "No key" });

  redisClient.hgetall(key, async (err, data) => {
    if (err) return err;
    if (!data) return console.error({ getEmails: "No data" });

    try {
      const response = await mailer(data);

      return expireRedisItem(key, data, response);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  redisClient,
  writeRedis,
  expireRedisItem,
  getEmailsFromRedisAndSend,
};
