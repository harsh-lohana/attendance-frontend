import React, { useState, useEffect } from 'react';
import { Calendar, List, Filter, Download, ArrowLeft, User, Clock, Check, X, AlertTriangle, Upload } from 'lucide-react';
import { format, parseISO, isToday, isYesterday, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { useParams } from "react-router";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Classroom = ({ onBack }) => {
    // State for attendance data
    const [classroom, setClassroom] = useState();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    // State for filters
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedStudent, setSelectedStudent] = useState('all');
    const [dateRange, setDateRange] = useState('all');

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    // Fetch attendance data for this classroom
    useEffect(() => {
        const fetchAttendanceData = async () => {
            setLoading(true);
            try {
                // This would be replaced with your actual API call
                // const response = await fetch(`/api/classrooms/${classroom.id}/attendance`);
                // const data = await response.json();

                // Mock data for demonstration
                const mockData = generateMockAttendanceData(id);

                // Sort by date (newest first)
                mockData.sort((a, b) => new Date(b.date) - new Date(a.date));

                setAttendanceRecords(mockData);
            } catch (err) {
                setError('Failed to load attendance data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, [classroom]);

    // Helper function to generate mock attendance data
    const generateMockAttendanceData = (classroom) => {
        const records = [];
        // Assume classroom has a students array
        const students = classroom.students || [
            { id: '1', name: 'Alex Johnson' },
            { id: '2', name: 'Maria Garcia' },
            { id: '3', name: 'James Wilson' },
            { id: '4', name: 'Sarah Chen' },
            { id: '5', name: 'David Kim' }
        ];

        // Generate records for the last 30 days
        const today = new Date();

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);

            // Skip weekends
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) continue;

            students.forEach(student => {
                // Randomly assign status (present: 80%, late: 10%, absent: 10%)
                const random = Math.random();
                let status;
                let timestamp = null;

                if (random < 0.8) {
                    status = 'present';
                    // Generate a random time between 8:30 AM and 9:00 AM
                    const hour = 8;
                    const minute = Math.floor(Math.random() * 30) + 30;
                    timestamp = new Date(date);
                    timestamp.setHours(hour, minute, 0);
                } else if (random < 0.9) {
                    status = 'late';
                    // Generate a random time between 9:00 AM and 9:30 AM
                    const hour = 9;
                    const minute = Math.floor(Math.random() * 30);
                    timestamp = new Date(date);
                    timestamp.setHours(hour, minute, 0);
                } else {
                    status = 'absent';
                }

                records.push({
                    id: `${date.toISOString()}-${student.id}`,
                    date: date.toISOString(),
                    studentId: student.id,
                    studentName: student.name,
                    status,
                    timestamp: timestamp ? timestamp.toISOString() : null
                });
            });
        }

        return records;
    };

    // Apply filters to the attendance records
    const filteredRecords = attendanceRecords.filter(record => {
        // Filter by date
        if (selectedDate && !isSameDay(parseISO(record.date), selectedDate)) {
            return false;
        }

        // Filter by date range
        if (dateRange === 'month') {
            const recordDate = parseISO(record.date);
            const monthStart = startOfMonth(new Date());
            const monthEnd = endOfMonth(new Date());
            if (recordDate < monthStart || recordDate > monthEnd) {
                return false;
            }
        }

        // Filter by status
        if (selectedStatus !== 'all' && record.status !== selectedStatus) {
            return false;
        }

        // Filter by student
        if (selectedStudent !== 'all' && record.studentId !== selectedStudent) {
            return false;
        }

        return true;
    });

    // Group records by date for display
    const recordsByDate = filteredRecords.reduce((groups, record) => {
        const date = record.date.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(record);
        return groups;
    }, {});

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("classroomID", "68067441c37337e5a3eeb8c6");
            formData.append("video", video)
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            setLoading(true);
            const { data } = await axios.post(
                "http://localhost:8000/api/attendance/create",
                formData,
                config
            );
            toast.success("Uploaded!");
            setLoading(false);
            navigate("/teacher-dashboard");
        } catch (error) {
            toast.error("Something went wrong!");
            setLoading(false);
            console.log(error.message);
        }
    };

    // Render status badge
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'present':
                return (
                    <div className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                        <Check className="w-4 h-4 mr-1" />
                        Present
                    </div>
                );
            case 'late':
                return (
                    <div className="flex items-center text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Late
                    </div>
                );
            case 'absent':
                return (
                    <div className="flex items-center text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm">
                        <X className="w-4 h-4 mr-1" />
                        Absent
                    </div>
                );
            default:
                return null;
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        if (isToday(date)) {
            return 'Today';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return format(date, 'EEEE, MMMM d, yyyy');
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <button
                        onClick={onBack}
                        className="mr-2 p-2 rounded-full hover:bg-gray-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold">{id} - Attendance</h1>
                </div>
                <p className="text-gray-600">Teacher: {id}</p>
            </div>

            {/* Upload New Attendance */}
            <form onSubmit={submitHandler}>
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Upload className="w-5 h-5 mr-2" />
                        Upload New Attendance
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <input
                                type="file"
                                accept="video/*"
                                name="video"
                                onChange={(e) => setVideo(e.target.files[0])}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                        </button>
                    </div>

                    {uploadStatus && (
                        <div className={`mt-4 p-3 rounded ${uploadStatus.success ? 'bg-green-100 text-green-700' :
                            uploadStatus.loading ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {uploadStatus.loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                    {uploadStatus.message}
                                </div>
                            ) : uploadStatus.success ? (
                                <div className="flex items-center">
                                    <Check className="w-4 h-4 mr-2" />
                                    {uploadStatus.message}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    {uploadStatus.message}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>

            {/* Filters */}
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                        <Filter className="w-5 h-5 mr-2" />
                        <h2 className="text-xl font-semibold">Filters</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Date Range</label>
                        <select
                            className="border rounded-md p-2"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Specific Date</label>
                        <input
                            type="date"
                            className="border rounded-md p-2"
                            onChange={(e) => setSelectedDate(e.target.value ? parseISO(e.target.value) : null)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Attendance Status</label>
                        <select
                            className="border rounded-md p-2"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="present">Present</option>
                            <option value="late">Late</option>
                            <option value="absent">Absent</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">Student</label>
                        <select
                            className="border rounded-md p-2"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="all">All Students</option>
                            {Array.from(new Set(attendanceRecords.map(r => r.studentId))).map(studentId => {
                                const student = attendanceRecords.find(r => r.studentId === studentId);
                                return (
                                    <option key={studentId} value={studentId}>
                                        {student.studentName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>

            {/* Attendance List */}
            <div className="bg-white p-6 rounded-lg shadow">
                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mr-3"></div>
                        <p>Loading attendance records...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center p-8">
                        <div className="bg-red-100 text-red-700 p-4 rounded flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            <p>{error}</p>
                        </div>
                    </div>
                ) : filteredRecords.length === 0 ? (
                    <div className="text-center p-8">
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No attendance records found</h3>
                        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                    </div>
                ) : (
                    <div>
                        {Object.keys(recordsByDate).sort((a, b) => new Date(b) - new Date(a)).map(date => (
                            <div key={date} className="mb-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2">
                                    {formatDate(date)}
                                </h3>
                                <div className="space-y-2">
                                    {recordsByDate[date].map(record => (
                                        <div
                                            key={record.id}
                                            className="flex flex-wrap md:flex-nowrap justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
                                                <div className="bg-gray-200 p-2 rounded-full mr-3">
                                                    <User className="w-5 h-5 text-gray-700" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{record.studentName}</p>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {record.timestamp
                                                            ? `${format(parseISO(record.timestamp), 'h:mm a')}`
                                                            : 'No time recorded'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                {renderStatusBadge(record.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Classroom;

