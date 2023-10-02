import mongoose from "mongoose";

const projectOfferingSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    month: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProjectOffering = mongoose.model(
  "ProjectOffering",
  projectOfferingSchema
);
export default ProjectOffering;
