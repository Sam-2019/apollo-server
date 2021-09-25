const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
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

const Child = mongoose.model("Child", childSchema);
module.exports = Child;
