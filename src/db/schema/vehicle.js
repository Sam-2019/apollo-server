const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  sundayService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SundayService",
  },
  cars: {
    type: Number,
  },
  motors: {
    type: Number,
  },
  bicycles: {
    type: Number,
  },
  timestamps: { createdAt: Date, updatedAt: Date },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
