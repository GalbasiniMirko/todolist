import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            const response = await authenticatedFetch("http://localhost:8080/api/tasks", {
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
                <div className="bg-white p-8 rounded-2xl shadow-lg">
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
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Additional details..."
                                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
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
                                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
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
                                    className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl mt-4 hover:bg-indigo-700 transition shadow-md"
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