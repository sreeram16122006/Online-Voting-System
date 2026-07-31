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

// ================================
// Debug
// ================================

console.log("PORT:", process.env.PORT);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("Mongo URI Exists:", !!process.env.MONGO_URI);

// ================================
// Connect Database
// ================================

await connectDB();

const app = express();

// ================================
// CORS
// ================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://online-voting-system-gamma-six.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// ================================
// Middleware
// ================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ================================
// Home
// ================================

app.get("/", (req, res) => {
  res.send("Voting API Running...");
});

// ================================
// API Routes
// ================================

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/candidates", candidateRoutes);

app.use("/api/votes", voteRoutes);

app.use("/api/election", electionRoutes);

app.use("/api/pdf", pdfRoutes);

// ================================
// 404
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
  console.log(`🚀 Server Running on Port ${PORT}`);
});