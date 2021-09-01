const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
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
    type: Number,
  },
  awarenessChannel: {
    type: Date,
  },
  awarenessChannelOther: {
    type: String,
  },
  contact: {
    type: String,
  },
  date: {
    type: Date,
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
});

module.exports = mongoose.model("Visitor", VisitorSchema);
