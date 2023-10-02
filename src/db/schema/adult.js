import mongoose from "mongoose";

const adultSchema = new mongoose.Schema(
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

const Adult = mongoose.model("Adult", adultSchema);
export default Adult;