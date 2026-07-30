import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    // Student Reference
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Student Details
    studentName: {
      type: String,
      required: true,
    },

    registerNumber: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    // Candidate Reference
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    // Candidate Details
    candidateName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vote", voteSchema);