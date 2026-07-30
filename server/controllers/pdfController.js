import PDFDocument from "pdfkit";
import Candidate from "../models/Candidate.js";

export const exportPDF = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ElectionReport.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text("Online Election Voting Report", {
      align: "center",
    });

    doc.moveDown();

    candidates.forEach((candidate, index) => {
      doc
        .fontSize(16)
        .text(`${index + 1}. ${candidate.name}`);

      doc.text(`Department : ${candidate.department}`);
      doc.text(`Votes : ${candidate.votes}`);

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};