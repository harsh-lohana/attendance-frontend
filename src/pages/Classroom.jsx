import React, { useState, useEffect } from 'react';
import { Calendar, List, Filter, Download, ArrowLeft, User, Clock, Check, X, AlertTriangle, Upload } from 'lucide-react';
import { format, parseISO, isToday, isYesterday, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { useParams } from "react-router";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Classroom = () => {

    const [classroom, setClassroom] = useState();
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [expandedRecords, setExpandedRecords] = useState({});

    // Toggle dropdown for a specific record
    const toggleDropdown = (recordId) => {
        setExpandedRecords(prev => ({
            ...prev,
            [recordId]: !prev[recordId]
        }));
    };

    // Count students in a record
    const countStudents = (record) => {
        return record.students?.length || 0;
    };

    // Format date from ISO string (assuming record has a date field)
    const formatDate = (dateString) => {
        if (!dateString) return "No date";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const getClassroom = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.get(
                `http://localhost:8000/api/classroom?classroomID=${id}`,
                config
            );
            setLoading(false);
            setClassroom(data);
        } catch (error) {
            toast.error("Something went wrong!");
            setLoading(false);
            console.log(error.message);
        }
    }

    const getAttendance = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.get(
                `http://localhost:8000/api/attendance/classroom?classroomID=${id}`,
                config
            );
            setAttendanceRecords(data);
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong!");
            setLoading(false);
            console.log(error.message);
        }
    }

    useEffect(() => {
        getClassroom();
        getAttendance();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("classroomID", id);
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

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <h1 className="text-2xl font-bold">{classroom && classroom.subject} - Attendance</h1>
                </div>
                <p className="text-gray-600">Teacher: {classroom && classroom.teacher.name}</p>
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
            <div className="max-w-3xl mx-auto p-4">
                {!attendanceRecords || attendanceRecords.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg shadow-sm">
                        <p className="text-gray-500">No attendance records found for this classroom</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {attendanceRecords.map((record) => (
                            <div key={record._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                {/* Record header - always visible */}
                                <div
                                    className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer"
                                    onClick={() => toggleDropdown(record._id)}
                                >
                                    <div>
                                        <h3 className="font-medium text-lg text-gray-800">
                                            {formatDate(record.createdAt)}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {countStudents(record)} {countStudents(record) === 1 ? 'student' : 'students'} present
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="text-gray-400 hover:text-gray-600 focus:outline-none transition-transform duration-200 transform">
                                            <svg
                                                className={`w-5 h-5 ${expandedRecords[record._id] ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Dropdown content - students list */}
                                {expandedRecords[record._id] && (
                                    <div className="border-t border-gray-200">
                                        {!record.students || record.students.length === 0 ? (
                                            <div className="p-4 text-center text-gray-500">
                                                No students in this record
                                            </div>
                                        ) : (
                                            <ul className="divide-y divide-gray-200">
                                                {record.students.map((student) => (
                                                    <li key={student._id} className="p-4 hover:bg-gray-50 flex items-center">
                                                        <div className="flex-shrink-0">
                                                        </div>
                                                        <div className="ml-4">
                                                            <h4 className="text-base font-medium text-gray-800">{student.name}</h4>
                                                            <p className="text-sm text-gray-500">{student.studentID || 'No ID'}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Classroom;

