import { useState, useRef } from 'react';
import { Upload, X, Video, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function UploadAttendance() {

    const [loading, setLoading] = useState("");
    const [video, setVideo] = useState();

    const navigate = useNavigate();

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

    return (
        <form onSubmit={submitHandler}>
            <input
                id="video"
                type="file"
                accept="video/*"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
                Upload
            </button>
        </form >
    );
}