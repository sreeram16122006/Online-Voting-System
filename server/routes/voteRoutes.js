import express from "express";

import {
  castVote,
  getResult,
} from "../controllers/voteController.js";

const router = express.Router();

router.post("/cast", castVote);

router.get("/result", getResult);

export default router;