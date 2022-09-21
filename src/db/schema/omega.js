const mongoose = require("mongoose");

const omegaSchema = new mongoose.Schema(
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

const Omega = mongoose.model("Omega", omegaSchema);
module.exports = Omega;
