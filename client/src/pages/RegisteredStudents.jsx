import { useEffect, useState } from "react";
import API from "../api/axios";

function RegisteredStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {

      const res = await API.get("/users");

      setStudents(res.data.data);

    } catch (err) {

      console.log(err);

      alert("Unable to load students");

    }
  };

  const downloadExcel = () => {

    window.open(
      "https://online-voting-system-4rvm.onrender.com/api/excel/students",
      "_blank"
    );

  };

  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1>👨‍🎓 Registered Students</h1>

      <br />

      <button
        onClick={downloadExcel}
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        📊 Download Excel
      </button>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >

        <thead>

          <tr>

            <th>S.No</th>
            <th>Name</th>
            <th>Register No</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Year</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student, index) => (

            <tr key={student._id}>

              <td>{index + 1}</td>

              <td>{student.name}</td>

              <td>{student.registerNumber}</td>

              <td>{student.mobile}</td>

              <td>{student.department}</td>

              <td>{student.year}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RegisteredStudents;