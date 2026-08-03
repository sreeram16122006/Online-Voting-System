import express from "express";
import {
  downloadStudentsExcel,
  downloadVotersExcel,
} from "../controllers/excelController.js";

const router = express.Router();

// Registered Students Excel
router.get("/students", downloadStudentsExcel);

// Voted Students Excel
router.get("/voters", downloadVotersExcel);

export default router;