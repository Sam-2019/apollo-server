const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Child = mongoose.model("Child", childSchema);
module.exports = Child;
