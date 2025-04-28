import React, { useState, useEffect } from 'react';
import { Trash, Edit, Plus, Search, X, Check, Users, Book, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classroomToDelete, setClassroomToDelete] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState();
  const [branch, setBranch] = useState("");
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const getClassrooms = async () => {
    try {
      setLoading(true);
      const item = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(item);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log({ teacherID: userInfo._id })
      const { data } = await axios.get(
        `http://localhost:8000/api/classroom/teacher?teacherID=${userInfo._id}`,
        config
      );
      console.log(data)
      setClassrooms(data);
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
      console.log(error.message);
    }
  }

  useEffect(() => {
    getClassrooms();
    if(classrooms) {

    }
  }, []);

  const openModal = (classroom = null) => {
    if (classroom) {
      setCurrentClassroom(classroom);
      // setFormData({
      //   subject: classroom.subject,
      //   year: classroom.year,
      //   branch: classroom.branch
      // });
    } else {
      setCurrentClassroom(null);
      // setFormData({
      //   subject: '',
      //   year: '',
      //   branch: ''
      // });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentClassroom(null);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubjectName = "B" + (["CSE", "ETC", "EEE", "IT", "CE"].indexOf(branch) + 1) + (25 - year) + ": " + subjectName;
      const item = localStorage.getItem("userInfo");
      const userInfo = JSON.parse(item);
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log({ subject: newSubjectName, teacher: userInfo._id })
      const { data } = await axios.post(
        "http://localhost:8000/api/classroom/create",
        { subject: newSubjectName, teacherID: userInfo._id },
        config
      );
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
      console.log(error.message);
    }
    // if (currentClassroom) {
    //   // Update existing classroom
    //   const updatedClassrooms = classrooms.map(classroom =>
    //     classroom.id === currentClassroom.id
    //       ? { ...classroom, ...formData }
    //       : classroom
    //   );
    //   setClassrooms(updatedClassrooms);
    // } else {
    //   // Create new classroom
    //   const newClassroom = {
    //     id: classrooms.length > 0 ? Math.max(...classrooms.map(c => c.id)) + 1 : 1,
    //     ...formData,
    //     studentCount: Math.floor(Math.random() * 30) + 15 // Random student count for demo
    //   };
    //   setClassrooms([...classrooms, newClassroom]);
    // }

    closeModal();
  };

  const confirmDelete = (classroom) => {
    setClassroomToDelete(classroom);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (classroomToDelete) {
      const filteredClassrooms = classrooms.filter(classroom =>
        classroom.id !== classroomToDelete.id
      );
      setClassrooms(filteredClassrooms);
      setIsDeleteModalOpen(false);
      setClassroomToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClassroomToDelete(null);
  };

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-blue-100">Manage your classrooms</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search classrooms..."
                  className="pl-10 pr-4 py-2 border rounded-lg bg-blue-500 bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => openModal()}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
              >
                <Plus size={18} />
                New Classroom
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Classrooms</h2>
            {filteredClassrooms.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600 mb-4">No classrooms found.</p>
                <button
                  onClick={() => openModal()}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  <Plus size={18} className="mr-2" />
                  Create your first classroom
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                  {filteredClassrooms.map((classroom, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 bg-white flex flex-col h-full"
                      onClick={() => viewClassroomDetails(classroom)}
                    >
                      <div className="bg-indigo-50 p-4 border-b">
                        <h3 className="font-medium text-lg truncate">{classroom.subject}</h3>
                      </div>
                      <div className="p-4 flex-grow">
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                          <Book size={16} className="mr-2 flex-shrink-0" />
                          <span className="truncate">{classroom.teacher.name}</span>
                        </div>
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                          <span className="truncate">{classroom.branch}</span>
                        </div>
                        <div className="flex items-center mb-2 text-sm text-gray-600">
                          <span className="truncate">{classroom.year}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users size={14} className="mr-1 flex-shrink-0" />
                          <span>{classroom.students.length} students</span>
                        </div>
                        <button
                          className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/classroom/${classroom._id}`)
                            // viewClassroomDetails(classroom);
                          }}
                        >
                          View Details
                          <ArrowRight size={14} className="ml-1 flex-shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-95 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-medium">
                {currentClassroom ? 'Edit Classroom' : 'Create New Classroom'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id="subject-name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    required
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
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentClassroom ? 'Update Classroom' : 'Create Classroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && classroomToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-2">Delete Classroom</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete "{classroomToDelete.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;