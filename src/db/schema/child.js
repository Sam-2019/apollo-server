const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const Child = mongoose.model("Child", childSchema);
module.exports = Child;
