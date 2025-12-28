import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authenticatedFetch } from "../utils/api";

function AddTask() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: today,
        time: now,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await authenticatedFetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error saving");
            }

            navigate("/homepage");

        } catch (err) {
            setError(err.message);
        }
    };

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
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">New activity</h1>
                    
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
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
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Additional details..."
                                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
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

                            <div className="w-1/2">
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
                            Save Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTask;