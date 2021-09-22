const Child = require("./schema/child");
const Member = require("./schema/member");
const SundayService = require("./schema/sundayService");
const Tithe = require("./schema/tithe");
const Pledge = require("./schema/pledge");
const Visitor = require("./schema/visitor");

const Mmv = require("./schema/mmv");
const Pvv = require("./schema/pvv");
const Welfare = require("./schema/welfare");
const ProjectOffering = require("./schema/project offering");

const Vehicle = require("./schema/vehicle");

const models = {
  Child,
  Member,
  SundayService,
  Tithe,
  Pledge,
  Visitor,
  Mmv,
  Pvv,
  Welfare,
  ProjectOffering,
  Vehicle,
};

module.exports = models;
