const { getEmailsFromRedisAndSend } = require("../services/redis");

const memberKey = "h3";
getEmailsFromRedisAndSend(memberKey);
