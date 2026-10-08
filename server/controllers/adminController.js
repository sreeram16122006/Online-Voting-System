import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";
import Election from "../models/Election.js";
import bcrypt from "bcryptjs";

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Admin credentials are not configured",
      });
    }

    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {
      return res.status(200).json({
        success: true,
        message: "Admin Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin Created",
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create admin",
    });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin Login Success",
      data: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
};

// Live Admin Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalStudents,
      votedStudents,
      totalCandidates,
      totalVotes,
      election,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ hasVoted: true }),
      Candidate.countDocuments({}),
      Vote.countDocuments({}),
      Election.findOne().lean(),
    ]);

    const notVotedStudents = Math.max(
      totalStudents - votedStudents,
      0
    );

    const turnoutPercentage =
      totalStudents > 0
        ? Number(
            ((votedStudents / totalStudents) * 100).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        votedStudents,
        notVotedStudents,
        totalCandidates,
        totalVotes,
        turnoutPercentage,
        remainingPercentage: Number(
          (100 - turnoutPercentage).toFixed(2)
        ),
        electionStatus: election?.status || "Stopped",
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard statistics",
    });
  }
};