import mongoose from "mongoose";

const titheSchema = new mongoose.Schema(
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

const Tithe = mongoose.model("Tithe", titheSchema);
export default Tithe;
