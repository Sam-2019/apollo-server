const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TitheSchema = new Schema({
  memberID: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
});

module.exports = mongoose.model("Tithe", TitheSchema);
