const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SundayServiceSchema = new Schema({
  date: {
    type: Number,
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
    type: Number,
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
});

module.exports = mongoose.model("SundayService", SundayServiceSchema);