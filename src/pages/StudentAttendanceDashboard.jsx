import React, { useState } from 'react';

const StudentAttendanceDashboard = () => {
  // Sample data - in a real application, this would come from an API or database
  const [student, setStudent] = useState({
    id: "ST12345",
    name: "Alex Johnson",
    course: "Computer Science",
    semester: "Fall 2024",
    attendance: [
      { date: "2025-03-01", subject: "Database Systems", status: "Present" },
      { date: "2025-03-01", subject: "Algorithms", status: "Present" },
      { date: "2025-03-02", subject: "Web Development", status: "Absent" },
      { date: "2025-03-02", subject: "Database Systems", status: "Present" },
      { date: "2025-03-03", subject: "Algorithms", status: "Late" },
      { date: "2025-03-03", subject: "Web Development", status: "Present" },
      { date: "2025-03-04", subject: "Database Systems", status: "Present" },
      { date: "2025-03-04", subject: "Algorithms", status: "Present" },
      { date: "2025-03-05", subject: "Web Development", status: "Absent" },
      { date: "2025-03-05", subject: "Database Systems", status: "Present" },
    ]
  });

  // Calculate attendance statistics
  const totalClasses = student.attendance.length;
  const presentCount = student.attendance.filter(record => record.status === "Present").length;
  const absentCount = student.attendance.filter(record => record.status === "Absent").length;
  const lateCount = student.attendance.filter(record => record.status === "Late").length;
  const attendancePercentage = (presentCount / totalClasses) * 100;

  // Group by subject for subject-wise attendance
  const subjectAttendance = {};
  student.attendance.forEach(record => {
    if (!subjectAttendance[record.subject]) {
      subjectAttendance[record.subject] = { total: 0, present: 0, absent: 0, late: 0 };
    }
    subjectAttendance[record.subject].total += 1;
    if (record.status === "Present") subjectAttendance[record.subject].present += 1;
    else if (record.status === "Absent") subjectAttendance[record.subject].absent += 1;
    else if (record.status === "Late") subjectAttendance[record.subject].late += 1;
  });

  const [filter, setFilter] = useState("all");

  const filteredAttendance = student.attendance.filter(record => {
    if (filter === "all") return true;
    return record.status.toLowerCase() === filter.toLowerCase();
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Absent": return "bg-red-100 text-red-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="mx-auto p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow">
      {/* Student Info Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
          <p className="text-gray-600">ID: {student.id} | Course: {student.course} | Semester: {student.semester}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">Overall Attendance</p>
          <p className={`text-2xl font-bold ${attendancePercentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
            {attendancePercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-blue-800">Total Classes</h3>
          <p className="text-2xl font-bold text-blue-900">{totalClasses}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-green-800">Present</h3>
          <p className="text-2xl font-bold text-green-900">{presentCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-red-800">Absent</h3>
          <p className="text-2xl font-bold text-red-900">{absentCount}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-yellow-800">Late</h3>
          <p className="text-2xl font-bold text-yellow-900">{lateCount}</p>
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Subject-wise Attendance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b text-left">Subject</th>
                <th className="py-2 px-4 border-b text-center">Total Classes</th>
                <th className="py-2 px-4 border-b text-center">Present</th>
                <th className="py-2 px-4 border-b text-center">Absent</th>
                <th className="py-2 px-4 border-b text-center">Late</th>
                <th className="py-2 px-4 border-b text-center">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(subjectAttendance).map(([subject, data]) => (
                <tr key={subject} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{subject}</td>
                  <td className="py-2 px-4 border-b text-center">{data.total}</td>
                  <td className="py-2 px-4 border-b text-center text-green-600">{data.present}</td>
                  <td className="py-2 px-4 border-b text-center text-red-600">{data.absent}</td>
                  <td className="py-2 px-4 border-b text-center text-yellow-600">{data.late}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span 
                      className={`font-medium ${(data.present / data.total) * 100 >= 75 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {((data.present / data.total) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Records */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Attendance Records</h2>
          <div>
            <select 
              className="border rounded p-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Subject</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{record.date}</td>
                  <td className="py-2 px-4 border-b">{record.subject}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDashboard;