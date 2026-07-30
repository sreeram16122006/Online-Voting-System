import Candidate from "../models/Candidate.js";

// ==========================
// Add Candidate
// ==========================

export const addCandidate = async (req, res) => {
  try {
    const {
      name,
      department,
      photo,
      symbol,
    } = req.body;

    if (!name || !department) {
      return res.status(400).json({
        success: false,
        message: "Name and Department are required",
      });
    }

    const candidate = await Candidate.create({
      name,
      department,
      photo,
      symbol,
    });

    res.status(201).json({
      success: true,
      message: "Candidate Added Successfully",
      data: candidate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Candidates
// ==========================

export const getCandidates = async (req, res) => {
  try {

    const candidates = await Candidate.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: candidates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Update Candidate
// ==========================

export const updateCandidate = async (req, res) => {
  try {

    const {
      name,
      department,
      photo,
      symbol,
    } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      {
        name,
        department,
        photo,
        symbol,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Candidate Updated Successfully",
      data: candidate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Delete Candidate
// ==========================

export const deleteCandidate = async (req, res) => {
  try {

    await Candidate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Candidate Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};