const child = require("./child");
const member = require("./member");
const sundayService = require("./sundayService");
const payment = require("./payment");
const pledge = require("./pledge");
const visitor = require("./visitor");
const vehicle = require("./vehicles");

const resolvers = {
  ...child,
  ...member,
  ...sundayService,
  ...payment,
  ...pledge,
  ...visitor,
  ...vehicle,
};

module.exports = resolvers;
