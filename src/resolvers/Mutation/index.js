const child = require("./child");
const member = require("./member");
const sundayService = require("./sundayService");
const payment = require("./payment");
const pledge = require("./pledge");
const visitor = require("./visitor");
// const vehicle = require("./vehicles");
const user = require("./user");
const logout = require("./logout");

const resolvers = {
  ...child,
  ...member,
  ...sundayService,
  ...payment,
  ...pledge,
  ...visitor,
  // ...vehicle,
  ...user,
  ...logout,
};

module.exports = resolvers;
