import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import UploadAttendance from "./pages/UploadAttendance"
import Classroom from "./pages/Classroom";
import StudentAttendance from "./pages/StudentAttendance";

function App() {
  return (
    <main>
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/upload-attendance" element={<UploadAttendance />} />
        <Route path="/classroom/:id" element={<Classroom />} />
        <Route path="/attendance/:classroom" element={<StudentAttendance />} />
      </Routes>
    </main>
  )
}

export default App
