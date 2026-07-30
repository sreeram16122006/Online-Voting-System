import Vote from "../models/Vote.js";
import User from "../models/User.js";
import Candidate from "../models/Candidate.js";

// ======================================
// Cast Vote
// ======================================

export const castVote = async (req, res) => {
  try {

    const { userId, candidateId } = req.body;

    if (!userId || !candidateId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Candidate ID are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    if (user.hasVoted) {
      return res.status(400).json({
        success: false,
        message: "You have already voted",
      });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate Not Found",
      });
    }

    await Vote.create({
  student: user._id,
  studentName: user.name,
  registerNumber: user.registerNumber,
  department: user.department,

  candidate: candidate._id,
  candidateName: candidate.name,
});

    user.hasVoted = true;
    await user.save();

    candidate.votes += 1;
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Vote Cast Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Election Result
// ======================================

export const getResult = async (req, res) => {
  try {

    const candidates = await Candidate.find().sort({
      votes: -1,
    });

    res.status(200).json({
      success: true,
      winner: candidates[0],
      results: candidates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};