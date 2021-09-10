const mongoose = require("mongoose");

const projectOfferingSchema = new mongoose.Schema({
  memberID: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Member",
    type: String,
  },
  month: {
    type: String,
  },
});

const ProjectOffering = mongoose.model("ProjectOffering", projectOfferingSchema);
module.exports = ProjectOffering;
