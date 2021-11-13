const cron = require("node-cron");
const {
  expireRedisItem,
  getEmailsFromRedisAndSend,
} = require("./redis");
const { sendMail } = require("./nodemailer");

const mailer = async (data, key) => {
  let response = [];

  if (data === undefined) {
    return console.error("No data");
  }

  if (data.length === 0) {
    return console.error("No data");
  }

  for (member of data) {
    const info = await sendMail(member.name, member.email);

    if (info.response.includes("OK")) {
      response.push("Mail sent");
    }
  }

  try {
    const feedback = expireRedisItem(member, data, response);

    return feedback;
  } catch (err) {
    return err;
  }
};

cron.schedule("0 10 * * * 2", async function () {
  const memberKey = "h3";
  const visitorKey = "visitor";

  getEmailsFromRedisAndSend(memberKey);

  getEmailsFromRedisAndSend(visitorKey);

  // redisClient.hgetall(visitorKey, async (err, result) => {
  //   if (err) return err;
  //   if (result.length === 0) return null;

  //   return mailer(result, visitorKey);
  // });
});

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
