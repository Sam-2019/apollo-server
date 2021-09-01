const child = require("./child");
const member = require("./member");
const sundayService = require("./sundayService");
const tithe = require("./tithe");
const pledge = require("./pledge");
const visitor = require("./visitor");

const resolvers = {
  ...child,
  ...member,
  ...sundayService,
  ...tithe,
  ...pledge,
  ...visitor,
};

module.exports = resolvers;
