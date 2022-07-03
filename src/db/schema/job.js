const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
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
  timestamps: { createdAt: Date, updatedAt: Date },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
