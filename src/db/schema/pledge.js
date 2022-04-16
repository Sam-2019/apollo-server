const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema({
  pledgeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  othername: {
    type: String,
  },
  contact: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  programme: {
    type: String,
  },
  amount: {
    type: Number,
  },
  pledgeDate: {
    type: String,
  },
  redeemedDate: {
    type: String,
  },
  status: {
    type: String,
    default: 'PENDING'
  },
});

const Pledge = mongoose.model("Pledge", pledgeSchema);
module.exports = Pledge;
