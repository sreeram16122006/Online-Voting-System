import ExcelJS from "exceljs";
import User from "../models/User.js";
import Vote from "../models/Vote.js";

// ======================================
// Registered Students Excel
// ======================================

export const downloadStudentsExcel = async (req, res) => {
  try {

    const students = await User.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registered Students");

    worksheet.columns = [
      { header: "S.No", key: "sno", width: 10 },
      { header: "Student Name", key: "name", width: 30 },
      { header: "Register Number", key: "registerNumber", width: 25 },
      { header: "Mobile Number", key: "mobile", width: 20 },
      { header: "Department", key: "department", width: 20 },
      { header: "Year", key: "year", width: 15 },
    ];

    students.forEach((student, index) => {
      worksheet.addRow({
        sno: index + 1,
        name: student.name,
        registerNumber: student.registerNumber,
        mobile: student.mobile,
        department: student.department,
        year: student.year,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Registered_Students.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Voted Students Excel
// ======================================

export const downloadVotersExcel = async (req, res) => {
  try {

    const votes = await Vote.find().sort({ createdAt: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Voted Students");

    worksheet.columns = [
      { header: "S.No", key: "sno", width: 10 },
      { header: "Student Name", key: "studentName", width: 30 },
      { header: "Register Number", key: "registerNumber", width: 25 },
      { header: "Department", key: "department", width: 20 },
      { header: "Candidate", key: "candidateName", width: 30 },
      { header: "Voted Date & Time", key: "date", width: 30 },
    ];

    votes.forEach((vote, index) => {
      worksheet.addRow({
        sno: index + 1,
        studentName: vote.studentName,
        registerNumber: vote.registerNumber,
        department: vote.department,
        candidateName: vote.candidateName,
        date: vote.createdAt.toLocaleString(),
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Voted_Students.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};