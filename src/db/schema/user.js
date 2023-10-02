import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    gender: {
      type: String,
    },
    contact: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    homeAddress: {
      type: String,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: String,
    },
    imageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
