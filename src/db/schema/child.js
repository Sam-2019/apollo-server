const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

module.exports = mongoose.model("Child", ChildSchema);
