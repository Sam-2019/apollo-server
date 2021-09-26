const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  sundayService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SundayService",
  },
  type: {
    type: String,
  },
  date: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
