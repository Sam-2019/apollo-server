const Member = require("./schema/member");
const SundayService = require("./schema/sundayService");
const Tithe = require("./schema/tithe");
const Pledge = require("./schema/pledge");
const Visitor = require("./schema/visitor");

const Mmv = require("./schema/mmv");
const Pvv = require("./schema/pvv");
const Welfare = require("./schema/welfare");
const ProjectOffering = require("./schema/projectOffering");

const Vehicle = require("./schema/vehicle");
const User = require("./schema/user");
const Job = require('./schema/job');

const models = {
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
  User,
  Job
};

module.exports = models;
