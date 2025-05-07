import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

const LoginPage = () => {

  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('student');
  const [userType, setUserType] = useState('student');

  const navigate = useNavigate();

  const studentSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/student/login",
        { studentID, password },
        config
      );
      toast.success("Logged in!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/student-dashboard");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Invalid email or password!");
      setLoading(false);
      console.log(error.message);
    }
  };

  const teacherSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/teacher/login",
        { email, password },
        config
      );
      toast.success("Logged in!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/teacher-dashboard");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Invalid email or password!");
      setLoading(false);
      console.log(error.message);
    }
  };

  const revealTestUSer = () => {
    setEmail("test@test.com");
    setPassword("test");
    toast.success("Test user revealed!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md scale-110">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Attendance Management System</h1>
          </div>
          {/* User Type Selector */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center font-medium ${userType === 'student' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setUserType('student')}
            >
              Student
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${userType === 'teacher' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setUserType('teacher')}
            >
              Teacher
            </button>
          </div>
          {/* Login Form */}
          <div className="p-6">
            {
              userType == 'student'
                ?
                <form onSubmit={studentSubmitHandler}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student-id">
                      Student ID
                    </label>
                    <input
                      id="text"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={studentID}
                      onChange={(e) => setStudentID(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Login as Student
                    </button>
                  </div>
                </form>
                :
                <form onSubmit={teacherSubmitHandler}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Login as Teacher
                    </button>
                  </div>
                </form>
            }
          </div>
          {/* Footer */}
          <div className="mb-2 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
