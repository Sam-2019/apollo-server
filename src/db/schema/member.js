const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  otherName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  age: {
    type: String,
  },
  gender: {
    type: Number,
    min: 1,
  },
  hometown: {
    type: String,
  },
  region: {
    type: String,
  },
  country: {
    type: String,
  },
  residentialAddress: {
    type: String,
  },
  contact: {
    type: String,
  },
  emergencyContact: {
    type: String,
  },
  emailAddress: {
    type: String,
    lowercase: true,
  },
  postalAddress: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  spouseName: {
    type: String,
  },
  numberOfChildren: {
    type: Number,
  },
  nameOfChildren: [
    {
      type: Schema.Types.ObjectId,
      ref: "Child",
    },
  ],
  dateJoinedChurch: {
    type: Date,
  },
  department: {
    type: String,
  },
  previousChurch: {
    type: String,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
