const cron = require("node-cron");
const { redisClient } = require("./redis");
const { sendMail } = require("./nodemailer");

const mailer = async (data, key) => {
  let response = [];

  if (data === undefined) {
    return console.error("No data");
  }

  for (member of data) {
    const info = await sendMail(member.name, member.email);

    if (info.response.includes("OK")) {
      response.push("Mail sent");
    }
  }

  try {
    if (key === "member" && data.length === response.length) {
      redisClient.expire("h3", 600);
      console.error("Success");
    }

    if (key === "visitor" && data.length === response.length) {
      redisClient.expire("h3", 600);
      console.error("Success");
    }

    return console.error("failed");
  } catch (err) {
    return err;
  }
};

cron.schedule("0 10 * * * 2", async function () {
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
});

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
