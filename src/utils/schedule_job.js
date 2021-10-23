const cron = require("node-cron");
const { redisClient } = require("./redis");
const { sendMail } = require("./nodemailer");

cron.schedule("0 10 * * * 2", function () {
  redisClient.hgetall("h3", async (err, result) => {
    for (member of result) {
      const data = await sendMail(member.name, member.email);
      if (data.error) "Send email failed";
    }
  });
});

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
