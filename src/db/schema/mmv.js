import mongoose from "mongoose";

const mmvSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    month: {
      type: String,
    },
  },
  { timestamps: true }
);

const MMV = mongoose.model("MMV", mmvSchema);
export default MMV;
