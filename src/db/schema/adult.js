const mongoose = require("mongoose");

const adultSchema = new mongoose.Schema({
  sundayService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SundayService",
  },
  group: {
    type: String,
  },
  date: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const Adult = mongoose.model("Adult", adultSchema);
module.exports = Adult;
