const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
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
    type: String,
  },
  chapel: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
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
  nameOfChildren: [{ firstName: String, lastName: String }],
  dateJoinedChurch: {
    type: Date,
  },
  department: [
    {
      type: String,
    },
  ],
  previousChurch: {
    type: String,
  },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
