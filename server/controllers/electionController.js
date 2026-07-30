import Election from "../models/Election.js";
import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";

// ===============================
// Get Election Status
// ===============================

export const getElectionStatus = async (req, res) => {
  try {

    let election = await Election.findOne();

    if (!election) {
      election = await Election.create({
        status: "Stopped",
      });
    }

    res.status(200).json({
      success: true,
      data: election,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Start Election
// ===============================

export const startElection = async (req, res) => {
  try {

    let election = await Election.findOne();

    if (!election) {
      election = await Election.create({
        status: "Active",
      });
    } else {
      election.status = "Active";
      await election.save();
    }

    res.status(200).json({
      success: true,
      message: "Election Started",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Stop Election
// ===============================

export const stopElection = async (req, res) => {
  try {

    const election = await Election.findOne();

    election.status = "Stopped";

    await election.save();

    res.status(200).json({
      success: true,
      message: "Election Stopped",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===============================
// Reset Election
// ===============================

export const resetElection = async (req, res) => {
  try {

    await Vote.deleteMany();

    await User.updateMany(
      {},
      {
        hasVoted: false,
      }
    );

    await Candidate.updateMany(
      {},
      {
        votes: 0,
      }
    );

    const election = await Election.findOne();

    election.status = "Stopped";

    await election.save();

    res.status(200).json({
      success: true,
      message: "Election Reset Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};