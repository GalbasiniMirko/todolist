import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authenticatedFetch } from "../utils/api";

function EditTask() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");

    const taskToEdit = location.state?.task;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title || "",
                description: taskToEdit.description || "",
                date: taskToEdit.date ? taskToEdit.date.split('T')[0] : "",
                time: taskToEdit.time || "",
            });
        } else {
            navigate("/homepage");
        }
    }, [taskToEdit, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!taskToEdit?.id) {
            setError("Task ID missing");
            return;
        }

        try {
            const response = await authenticatedFetch(`/api/tasks/${taskToEdit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error updating task");
            }

            navigate("/homepage");

        } catch (err) {
            setError(err.message);
        }
    };

    if (!taskToEdit) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 max-w-lg mx-auto">
                
                <Link 
                    to="/homepage" 
                    className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Tasks
                </Link>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Activity ✏️</h1>
                    
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                maxLength={100}
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g. Shopping"
                                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <textarea
                                name="description"
                                maxLength={300}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Additional details..."
                                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl mt-4 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                        >
                            Update Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditTask;