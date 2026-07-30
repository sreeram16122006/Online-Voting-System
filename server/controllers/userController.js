import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= REGISTER =================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      mobile,
      registerNumber,
      department,
      year,
      password,
    } = req.body;

    const userExists = await User.findOne({
      $or: [{ mobile }, { registerNumber }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      registerNumber,
      department,
      year,
      password: hashedPassword,
      hasVoted: false,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= LOGIN =================

export const loginUser = async (req, res) => {
  try {

    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET ALL USERS =================

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};