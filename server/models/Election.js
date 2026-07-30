import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Active", "Stopped"],
      default: "Stopped",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Election", electionSchema);