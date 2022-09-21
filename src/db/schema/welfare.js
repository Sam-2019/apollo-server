const mongoose = require("mongoose");

const welfareSchema = new mongoose.Schema(
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

const Welfare = mongoose.model("Welfare", welfareSchema);
module.exports = Welfare;
