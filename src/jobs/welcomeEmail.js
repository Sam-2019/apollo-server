const { getEmailsFromRedisAndSend } = require("../services/redis");

const memberKey = "h3";
const visitorKey = "h4";

getEmailsFromRedisAndSend(memberKey);
getEmailsFromRedisAndSend(visitorKey);
