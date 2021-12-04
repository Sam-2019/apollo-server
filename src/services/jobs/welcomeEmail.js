const { getEmailsFromRedisAndSend } = require("./redis");

const memberKey = "h3";
getEmailsFromRedisAndSend(memberKey);
