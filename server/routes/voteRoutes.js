import express from "express";

import {
  castVote,
  getResult,
  getAllVotes,
} from "../controllers/voteController.js";

const router = express.Router();

// Cast Vote
router.post("/cast", castVote);

// Election Result
router.get("/result", getResult);

// All Voted Students
router.get("/", getAllVotes);

export default router;