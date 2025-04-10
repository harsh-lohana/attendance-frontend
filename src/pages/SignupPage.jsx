import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

const SignupPage = () => {

  const [studentID, setStudentID] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState(1);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [userType, setUserType] = useState('student');
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const toggleBranchDropdown = () => {
    setBranchDropdownOpen(!branchDropdownOpen);
  };
  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
  };

  const selectBranch = (branch) => {
    setBranch(branch);
    setBranchDropdownOpen(false);
  };
  const selectYear = (year) => {
    setYear(year);
    setYearDropdownOpen(false);
  };

  const studentSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("studentID", studentID);
        formData.append("branch", branch);
        formData.append("year", year);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image)
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:8000/api/student/signup",
          formData,
          config
        );
        toast.success("Signed in!");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setError(error.response.data.message);
        toast.error("Invalid email or password!");
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  const teacherSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:8000/api/teacher/signup",
          { name, email, password },
          config
        );
        toast.success("Signed in!");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setError(error.response.data.message);
        toast.error("Invalid email or password!");
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div className={`min-h-screen ${userType == "student" ? "m-12" : ""} flex flex-col justify-center items-center p-4`}>
      {loading ? <Loader /> :
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
            {/* Signup Form */}
            <div className="p-6">
              {
                userType == 'student'
                  ?
                  <form onSubmit={studentSubmitHandler}>
                    <div className="flex flex-col items-center">
                      <div className="mb-3 relative">
                        <div className="h-18 w-18 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-blue-300">
                          {/* {previewUrl ? (
                          <img src={previewUrl} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : ( */}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {/* )} */}
                        </div>
                        <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-700 shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </label>
                        <input
                          id="image"
                          type="file"
                          // className="hidden" 
                          accept="image/*"
                          name="image"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      {/* <label className="text-sm text-gray-600 text-center">
                      {previewUrl ? "Change profile picture" : "Upload profile picture"}
                    </label> */}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        laceholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student-id">
                        Student ID
                      </label>
                      <input
                        id="student-id"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={studentID}
                        laceholder="Enter your student ID"
                        onChange={(e) => setStudentID(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center"
                          onClick={toggleBranchDropdown}
                        >
                          <span className={branch ? "" : "text-gray-400"}>
                            {branch || "Select your branch"}
                          </span>
                          <span className="text-gray-500 text-lg">▼</span>
                        </button>
                        {branchDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {["CSE", "CE", "IT", "ETC", "EEE"].map((branch, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => selectBranch(branch)}
                              >
                                {branch}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center"
                          onClick={toggleYearDropdown}
                        >
                          <span className={year ? "" : "text-gray-400"}>
                            {year || "Select your year"}
                          </span>
                          <span className="text-gray-500 text-lg">▼</span>
                        </button>
                        {yearDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                            {[1, 2, 3, 4].map((year, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => selectYear(year)}
                              >
                                {year}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
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
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                        Confirm Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      >
                        Signup as Student
                      </button>
                    </div>
                  </form>
                  :
                  <form onSubmit={teacherSubmitHandler}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        laceholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
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
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                        Confirm Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                      >
                        Signup as Teacher
                      </button>
                    </div>
                  </form>
              }
            </div>
            {/* Footer */}
            <div className="mb-2 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SignupPage;
