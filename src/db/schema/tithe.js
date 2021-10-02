const mongoose = require("mongoose");

const titheSchema = new mongoose.Schema({
  memberID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  month: {
    type: String,
  },
});

const Tithe = mongoose.model("Tithe", titheSchema);
module.exports = Tithe;
