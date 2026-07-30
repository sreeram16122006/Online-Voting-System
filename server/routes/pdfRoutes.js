import express from "express";
import PDFDocument from "pdfkit";
import Candidate from "../models/Candidate.js";
import Vote from "../models/Vote.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const candidates = await Candidate.find();

    const report = [];

    for (const candidate of candidates) {

      const votes = await Vote.countDocuments({
        candidate: candidate._id,
      });

      report.push({
        name: candidate.name,
        department: candidate.department,
        votes,
      });

    }

    report.sort((a, b) => b.votes - a.votes);

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Election_Report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("Online Election Voting System", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(18).text("Election Result Report");

    doc.moveDown();

    report.forEach((item, index) => {

      doc.fontSize(14).text(
        `${index + 1}. ${item.name}
Department : ${item.department}
Votes : ${item.votes}`
      );

      doc.moveDown();

    });

    doc.end();

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

export default router;