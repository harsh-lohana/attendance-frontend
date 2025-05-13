import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import toast from 'react-hot-toast';
import axios from 'axios';

const StudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const classroomID = params.classroom;

    const getStudentClassroomAttendance = async () => {
        try {
            setLoading(true);
            const item = localStorage.getItem("userInfo");
            const userInfo = JSON.parse(item);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.get(
                `http://localhost:8000/api/attendance/student/classroom?studentID=${userInfo._id}&classroomID=${classroomID}`,
                config
            );
            setAttendance(data);
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong!");
            setLoading(false);
            console.log(error.message);
        }
    }

    useEffect(() => {
        getStudentClassroomAttendance();
    }, []);

    // Calculate attendance percentage
    const attendancePercentage = attendance.total && attendance.total.length > 0
        ? ((attendance.present ? attendance.present.length : 0) / attendance.total.length * 100)
        : 0;
    
    // Determine color based on attendance percentage
    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Attendance Summary</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {/* Progress bar */}
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                Attendance Rate
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-blue-600">
                                                {attendancePercentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                        <div 
                                            style={{ width: `${attendancePercentage}%` }} 
                                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressColor(attendancePercentage)}`}>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <div className="text-blue-500 text-lg font-semibold">
                                            {attendance.present ? attendance.present.length : 0}
                                        </div>
                                        <div className="text-sm text-gray-600">Classes Attended</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                                        <div className="text-purple-500 text-lg font-semibold">
                                            {attendance.total ? attendance.total.length : 0}
                                        </div>
                                        <div className="text-sm text-gray-600">Total Classes</div>
                                    </div>
                                </div>
                                
                                {/* Absence info */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Absences:</span>
                                        <span className="font-semibold">
                                            {attendance.total && attendance.present ? 
                                                attendance.total.length - attendance.present.length : 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 text-xs text-gray-500 text-center">
                                {attendancePercentage >= 80 ? (
                                    <p>Great attendance! Keep it up.</p>
                                ) : attendancePercentage >= 60 ? (
                                    <p>Your attendance is good, but there's room for improvement.</p>
                                ) : (
                                    <p>Your attendance needs improvement. Please try to attend more classes.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;