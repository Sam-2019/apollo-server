import mongoose from "mongoose";

const sundayTotalSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const SundayTotal = mongoose.model("SundayTotal", sundayTotalSchema);
export default SundayTotal;
