import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ================================
// Middleware
// ================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================================
// Routes
// ================================

app.get("/", (req, res) => {
  res.send("Voting API Running...");
});

// User Routes
app.use("/api/users", userRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Candidate Routes
app.use("/api/candidates", candidateRoutes);

// Vote Routes
app.use("/api/votes", voteRoutes);

// Election Routes
app.use("/api/election", electionRoutes);

// PDF Routes
app.use("/api/pdf", pdfRoutes);

// ================================
// 404 Route
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ================================
// Error Handler
// ================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================================
// Start Server
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});