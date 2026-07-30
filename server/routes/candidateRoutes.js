import express from "express";

import {
  addCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", addCandidate);

router.get("/", getCandidates);

router.put("/:id", updateCandidate);

router.delete("/:id", deleteCandidate);

export default router;