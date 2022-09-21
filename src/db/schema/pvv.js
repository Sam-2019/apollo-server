const mongoose = require("mongoose");

const pvvSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    month: {
      type: String,
    },
  },
  { timestamps: true }
);

const PVV = mongoose.model("PVV", pvvSchema);
module.exports = PVV;
