const cron = require("node-cron");
const { getEmailsFromRedisAndSend } = require("./redis");

cron.schedule("0 10 * * * 2", async function () {
  const memberKey = "h3";
  const visitorKey = "visitor";

  getEmailsFromRedisAndSend(memberKey);

  getEmailsFromRedisAndSend(visitorKey);
});

// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
