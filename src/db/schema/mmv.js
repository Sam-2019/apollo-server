const mongoose = require("mongoose");

const mmvSchema = new mongoose.Schema({
  memberID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  month: {
    type: String,
  },
});

const MMV = mongoose.model("MMV", mmvSchema);
module.exports = MMV;
