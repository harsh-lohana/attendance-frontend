import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

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
      </Routes>
    </main>
  )
}

export default App
