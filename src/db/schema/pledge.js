const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PledgeSchema = new Schema({
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

module.exports = mongoose.model("Pledge", PledgeSchema);
