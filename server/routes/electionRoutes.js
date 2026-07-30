import express from "express";

import {
  getElectionStatus,
  startElection,
  stopElection,
  resetElection,
} from "../controllers/electionController.js";

const router = express.Router();

// ===============================
// Election Status
// ===============================
router.get("/status", getElectionStatus);

// ===============================
// Start Election
// ===============================
router.put("/start", startElection);

// ===============================
// Stop Election
// ===============================
router.put("/stop", stopElection);

// ===============================
// Reset Election
// ===============================
router.put("/reset", resetElection);

export default router;