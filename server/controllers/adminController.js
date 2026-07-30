import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

// =============================
// Create Default Admin
// =============================

export const createAdmin = async (req, res) => {
  try {

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

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin Created",
      data: admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =============================
// Admin Login
// =============================

export const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin Login Success",
      data: admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};