import express from "express";

import {
  createAdmin,
  loginAdmin,
  getAdminDashboard,
} from "../controllers/adminController.js";

const router = express.Router();

// Admin creation
router.post("/create", createAdmin);

// Admin login
router.post("/login", loginAdmin);

// Live dashboard statistics
router.get("/dashboard", getAdminDashboard);

export default router;