const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Kid = mongoose.model("Kid", kidSchema);
module.exports = Kid;
