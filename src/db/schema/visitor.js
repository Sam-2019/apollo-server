const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  ageGroup: {
    type: String,
  },
  monthOfBirth: {
    type: String,
  },
  chapel: {
    type: String,
  },
  awarenessChannel: {
    type: String,
  },
  awarenessChannelOther: {
    type: String,
  },
  contact: {
    type: String,
  },
  date: {
    type: String,
  },
  invitedBy: {
    type: String,
  },
  knowingChrist: {
    type: String,
  },
  location: {
    type: String,
  },
  membership: {
    type: String,
  },
  group: {
    type: String,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
module.exports = Visitor;
