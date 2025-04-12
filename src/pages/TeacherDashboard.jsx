import React, { useState, useEffect } from 'react';
import { Trash, Edit, Plus, Search, X, Check, Users } from 'lucide-react';

const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    grade: '',
    description: '',
    schedule: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classroomToDelete, setClassroomToDelete] = useState(null);

  // Initial demo data
  useEffect(() => {
    const demoClassrooms = [
      {
        id: 1,
        name: 'Mathematics 101',
        subject: 'Mathematics',
        grade: '9th Grade',
        description: 'Foundational course covering algebra, geometry, and basic trigonometry',
        schedule: 'Monday, Wednesday, Friday - 9:00 AM to 10:30 AM',
        studentCount: 28
      },
      {
        id: 2,
        name: 'World History',
        subject: 'History',
        grade: '10th Grade',
        description: 'Comprehensive survey of world history from ancient civilizations to modern times',
        schedule: 'Tuesday, Thursday - 11:00 AM to 12:30 PM',
        studentCount: 32
      },
      {
        id: 3,
        name: 'Physics Lab',
        subject: 'Science',
        grade: '11th Grade',
        description: 'Laboratory-based physics course with hands-on experiments',
        schedule: 'Monday, Wednesday - 1:00 PM to 3:00 PM',
        studentCount: 24
      }
    ];
    setClassrooms(demoClassrooms);
  }, []);

  const openModal = (classroom = null) => {
    if (classroom) {
      setCurrentClassroom(classroom);
      setFormData({
        name: classroom.name,
        subject: classroom.subject,
        grade: classroom.grade,
        description: classroom.description,
        schedule: classroom.schedule
      });
    } else {
      setCurrentClassroom(null);
      setFormData({
        name: '',
        subject: '',
        grade: '',
        description: '',
        schedule: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentClassroom(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentClassroom) {
      // Update existing classroom
      const updatedClassrooms = classrooms.map(classroom => 
        classroom.id === currentClassroom.id 
          ? { ...classroom, ...formData }
          : classroom
      );
      setClassrooms(updatedClassrooms);
    } else {
      // Create new classroom
      const newClassroom = {
        id: classrooms.length > 0 ? Math.max(...classrooms.map(c => c.id)) + 1 : 1,
        ...formData,
        studentCount: Math.floor(Math.random() * 30) + 15 // Random student count for demo
      };
      setClassrooms([...classrooms, newClassroom]);
    }
    
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
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.grade.toLowerCase().includes(searchTerm.toLowerCase())
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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classroom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClassrooms.map((classroom) => (
                      <tr key={classroom.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{classroom.name}</div>
                              <div className="text-sm text-gray-500">{classroom.subject}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{classroom.grade}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{classroom.schedule}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <Users size={16} className="mr-2 text-gray-400" />
                            {classroom.studentCount} students
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openModal(classroom)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => confirmDelete(classroom)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Classroom Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Mathematics 101"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                    Grade Level
                  </label>
                  <input
                    type="text"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 9th Grade"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Brief description of the class"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule
                  </label>
                  <input
                    type="text"
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Monday, Wednesday, Friday - 9:00 AM to 10:30 AM"
                    required
                  />
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