import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    // Candidate Photo
    photo: {
      type: String,
      default: "",
    },

    // Election Symbol
    symbol: {
      type: String,
      default: "",
    },

    // Total Votes
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;