const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema({
  pledgeID: {
    type: String,
  },
  amount: {
    type: String,
  },
  programme: {
    type: String,
  },
  status: {
    type: String,
  },
  pledgeDate: {
    type: Date,
  },
  redeemedDate: {
    type: Date,
  },
});

const Pledge = mongoose.model("Pledge", pledgeSchema);
module.exports = Pledge;
