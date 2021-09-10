const mongoose = require("mongoose");

const sundayServiceSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  preacher: {
    type: String,
  },
  theme: {
    type: String,
  },
  bibleText: {
    type: String,
  },
  adultFemale: {
    type: Number,
  },
  adultMale: {
    type: Number,
  },
  omegaFemale: {
    type: Number,
  },
  omegaMale: {
    type: Number,
  },
  childrenBoy: {
    type: Number,
  },
  childrenGirl: {
    type: Number,
  },
  altercallFemale: {
    type: Number,
  },
  altercallMen: {
    type: Number,
  },
  visitorsFemale: {
    type: Number,
  },
  visitorsMale: {
    type: Number,
  },
  cars: {
    type: Number,
  },
  motors: {
    type: Number,
  },
  bicycles: {
    type: Number,
  },
  endTime: {
    type: String,
  },
  type: {
    type: String,
  },
});

const SundayService = mongoose.model("SundayService", sundayServiceSchema);
module.exports = SundayService;
