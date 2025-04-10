import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StudentAttendanceDashboard from "./pages/StudentAttendanceDashboard"
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
        <Route path="/dashboard" element={<StudentAttendanceDashboard />} />
      </Routes>
    </main>
  )
}

export default App
