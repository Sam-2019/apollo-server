import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    domain: {
      type: String,
    },
    imgURL: {
      type: String,
    },
    favicon: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
