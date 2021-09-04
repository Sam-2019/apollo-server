const mongoose = require("mongoose");

const pledgeSchema = new mongoose.Schema({
  pledgeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  status: {
    type: String,
    default: 'PENDING'
  },
  pledgeDate: {
    type: String,
  },
  programme: {
    type: String,
  },
  redeemedDate: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const Pledge = mongoose.model("Pledge", pledgeSchema);
module.exports = Pledge;
