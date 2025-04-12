import React, { useState, useEffect } from 'react';
import { Calendar, Book, Clock, Users, Search, ArrowRight, BookOpen } from 'lucide-react';

const StudentDashboard = () => {
  const [myClassrooms, setMyClassrooms] = useState([]);
  const [availableClassrooms, setAvailableClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('my-classrooms');
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showClassroomDetails, setShowClassroomDetails] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    // Classrooms the student is already enrolled in
    const enrolledClassrooms = [
      {
        id: 1,
        name: 'Mathematics 101',
        subject: 'Mathematics',
        grade: '9th Grade',
        teacher: 'Dr. Sarah Johnson',
        description: 'Foundational course covering algebra, geometry, and basic trigonometry',
        schedule: 'Monday, Wednesday, Friday - 9:00 AM to 10:30 AM',
        studentCount: 28,
        enrolled: true,
        announcements: [
          { id: 1, date: '2025-04-10', content: 'Quiz on quadratic equations tomorrow!' },
          { id: 2, date: '2025-04-05', content: 'Please complete homework exercises 3.1-3.4 by Friday.' }
        ],
        upcomingAssignments: [
          { id: 1, title: 'Problem Set 4', dueDate: '2025-04-15', status: 'pending' },
          { id: 2, title: 'Mid-Term Exam', dueDate: '2025-04-20', status: 'pending' }
        ]
      },
      {
        id: 3,
        name: 'Physics Lab',
        subject: 'Science',
        grade: '9th Grade',
        teacher: 'Mr. Robert Chen',
        description: 'Laboratory-based physics course with hands-on experiments',
        schedule: 'Monday, Wednesday - 1:00 PM to 3:00 PM',
        studentCount: 24,
        enrolled: true,
        announcements: [
          { id: 1, date: '2025-04-09', content: 'Lab reports due by this Friday' }
        ],
        upcomingAssignments: [
          { id: 1, title: 'Motion Experiment Analysis', dueDate: '2025-04-14', status: 'completed' },
          { id: 2, title: 'Forces Lab Report', dueDate: '2025-04-18', status: 'pending' }
        ]
      }
    ];

    // Available classrooms to join
    const joinableClassrooms = [
      {
        id: 2,
        name: 'World History',
        subject: 'History',
        grade: '9th Grade',
        teacher: 'Ms. Elena Rodriguez',
        description: 'Comprehensive survey of world history from ancient civilizations to modern times',
        schedule: 'Tuesday, Thursday - 11:00 AM to 12:30 PM',
        studentCount: 32,
        enrolled: false
      },
      {
        id: 4,
        name: 'English Literature',
        subject: 'English',
        grade: '9th Grade',
        teacher: 'Mr. James Wilson',
        description: 'Analysis of classic and contemporary literature with emphasis on critical thinking skills',
        schedule: 'Tuesday, Thursday - 9:00 AM to 10:30 AM',
        studentCount: 30,
        enrolled: false
      },
      {
        id: 5,
        name: 'Computer Science Basics',
        subject: 'Computer Science',
        grade: '9th Grade',
        teacher: 'Dr. Maya Patel',
        description: 'Introduction to programming concepts, algorithms, and computational thinking',
        schedule: 'Wednesday, Friday - 2:00 PM to 3:30 PM',
        studentCount: 26,
        enrolled: false
      }
    ];

    setMyClassrooms(enrolledClassrooms);
    setAvailableClassrooms(joinableClassrooms);
  }, []);

  const joinClassroom = (classroomId) => {
    const classroomToJoin = availableClassrooms.find(c => c.id === classroomId);
    if (classroomToJoin) {
      // Add classroom to enrolled list with empty assignments and announcements
      const updatedClassroom = {
        ...classroomToJoin,
        enrolled: true,
        announcements: [],
        upcomingAssignments: []
      };
      
      setMyClassrooms([...myClassrooms, updatedClassroom]);
      setAvailableClassrooms(availableClassrooms.filter(c => c.id !== classroomId));
    }
  };

  const viewClassroomDetails = (classroom) => {
    setSelectedClassroom(classroom);
    setShowClassroomDetails(true);
  };

  const backToClassroomList = () => {
    setShowClassroomDetails(false);
    setSelectedClassroom(null);
  };

  // Filter classrooms based on search term
  const filterClassrooms = (classrooms) => {
    return classrooms.filter(classroom => 
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredMyClassrooms = filterClassrooms(myClassrooms);
  const filteredAvailableClassrooms = filterClassrooms(availableClassrooms);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
              <p className="text-indigo-100">View and join your classrooms</p>
            </div>
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search classrooms..."
                className="pl-10 pr-4 py-2 border rounded-lg bg-indigo-500 bg-opacity-20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!showClassroomDetails ? (
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'my-classrooms'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('my-classrooms')}
                >
                  My Classrooms
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === 'join-classrooms'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('join-classrooms')}
                >
                  Join Classrooms
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'my-classrooms' && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Your Enrolled Classrooms</h2>
                  {filteredMyClassrooms.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-600 mb-4">You haven't joined any classrooms yet.</p>
                      <button
                        onClick={() => setActiveTab('join-classrooms')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Browse Available Classrooms
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredMyClassrooms.map((classroom) => (
                        <div
                          key={classroom.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => viewClassroomDetails(classroom)}
                        >
                          <div className="bg-indigo-50 p-4 border-b">
                            <h3 className="font-medium text-lg">{classroom.name}</h3>
                            <p className="text-sm text-gray-600">{classroom.subject}</p>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center mb-2 text-sm text-gray-600">
                              <Book size={16} className="mr-2" />
                              <span>{classroom.teacher}</span>
                            </div>
                            <div className="flex items-center mb-2 text-sm text-gray-600">
                              <Calendar size={16} className="mr-2" />
                              <span>{classroom.grade}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock size={16} className="mr-2" />
                              <span className="truncate">{classroom.schedule.split(' - ')[0]}</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center">
                            <div className="text-sm text-gray-500 flex items-center">
                              <Users size={14} className="mr-1" />
                              <span>{classroom.studentCount} students</span>
                            </div>
                            <button
                              className="text-indigo-600 text-sm font-medium flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewClassroomDetails(classroom);
                              }}
                            >
                              View Details
                              <ArrowRight size={14} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'join-classrooms' && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Available Classrooms</h2>
                  {filteredAvailableClassrooms.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-600 mb-4">No available classrooms to join.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classroom</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredAvailableClassrooms.map((classroom) => (
                            <tr key={classroom.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{classroom.name}</div>
                                  <div className="text-sm text-gray-500">{classroom.subject} | {classroom.grade}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{classroom.teacher}</div>
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
                                  onClick={() => joinClassroom(classroom.id)}
                                  className="inline-flex items-center px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
                                >
                                  Join Class
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          /* Classroom Detail View */
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <button 
                onClick={backToClassroomList}
                className="mb-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                ← Back to Classrooms
              </button>
              
              <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold">{selectedClassroom.name}</h2>
                <p className="text-gray-600">{selectedClassroom.subject} | {selectedClassroom.grade}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <Book size={18} className="mr-2 text-indigo-500" />
                    Teacher
                  </h3>
                  <p className="text-gray-700">{selectedClassroom.teacher}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <Clock size={18} className="mr-2 text-indigo-500" />
                    Schedule
                  </h3>
                  <p className="text-gray-700">{selectedClassroom.schedule}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                    <Users size={18} className="mr-2 text-indigo-500" />
                    Students
                  </h3>
                  <p className="text-gray-700">{selectedClassroom.studentCount} students enrolled</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Description</h3>
                <p className="text-gray-700">{selectedClassroom.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <BookOpen size={18} className="mr-2 text-indigo-500" />
                    Upcoming Assignments
                  </h3>
                  {selectedClassroom.upcomingAssignments && selectedClassroom.upcomingAssignments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClassroom.upcomingAssignments.map(assignment => (
                        <div key={assignment.id} className="border rounded-lg p-3 bg-white">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{assignment.title}</h4>
                            <span className={`text-sm px-2 py-1 rounded ${
                              assignment.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No upcoming assignments</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Recent Announcements</h3>
                  {selectedClassroom.announcements && selectedClassroom.announcements.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClassroom.announcements.map(announcement => (
                        <div key={announcement.id} className="border rounded-lg p-3 bg-gray-50">
                          <p className="text-sm text-gray-500 mb-1">{announcement.date}</p>
                          <p className="text-gray-700">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent announcements</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;