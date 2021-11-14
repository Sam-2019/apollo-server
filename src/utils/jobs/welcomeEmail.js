const { redisClient, getEmailsFromRedisAndSend } = require("./redis");
const { mailer } = require("./nodemailer");

const memberKey = "h3";
const visitorKey = "visitor";

redisClient.hgetall(memberKey, async (err, result) => {
  if (err) return err;
  if (result.length === 0) return null;

  return mailer(result, memberKey);
});

redisClient.hgetall(visitorKey, async (err, result) => {
  if (err) return err;
  if (result.length === 0) return null;

  return mailer(result, visitorKey);
});

getEmailsFromRedisAndSend(memberKey);

getEmailsFromRedisAndSend(visitorKey);
