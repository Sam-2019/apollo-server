const mongoose = require("mongoose");

const welfareSchema = new mongoose.Schema({
  memberID: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Member",
    type: String,
  },
  month: {
    type: String,
  },
});

const Welfare = mongoose.model("Welfare", welfareSchema);
module.exports = Welfare;
