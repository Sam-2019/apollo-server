import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    ageGroup: {
      type: String,
    },
    monthOfBirth: {
      type: String,
    },
    chapel: {
      type: String,
    },
    awarenessChannel: {
      type: String,
    },
    awarenessChannelOther: {
      type: String,
    },
    contact: {
      type: String,
    },
    date: {
      type: String,
    },
    invitedBy: {
      type: String,
    },
    knowingChrist: {
      type: String,
    },
    location: {
      type: String,
    },
    membership: {
      type: String,
    },
    group: {
      type: String,
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
