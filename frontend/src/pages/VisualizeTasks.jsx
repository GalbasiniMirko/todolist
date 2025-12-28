import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DaySelector from "../components/DaySelector";
import TaskList from "../components/TaskList";
import { useNavigate, Link } from "react-router-dom";
import { authenticatedFetch } from "../utils/api";

function VisualizeTasks() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const handleDateChange = (isoDate) => {
        setSelectedDate(isoDate);
    };

    useEffect(() => {
        if (!selectedDate) return;

        const fetchTasks = async () => {
            try {
                const response = await authenticatedFetch(`/api/tasks/${selectedDate}`);

                if (!response.ok) {
                    throw new Error("Error loading tasks");
                }

                const data = await response.json();
                setTasks(data.tasks || []);
            } catch (err) {
                console.error("Network or authentication failure", err);
            }
        };

        fetchTasks();

    }, [selectedDate, navigate]);

    const toggleTask = async (taskId, currentState) => {

        const newState = currentState === "To do" ? "Done" : "To do";
        setTasks(prevTask => prevTask.map(task => 
            task.id === taskId ? {...task, state: newState} : task
        ));

        try {
            const response = await authenticatedFetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({ state: newState })
            });

            if (!response.ok) {
                throw new Error("Update error");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Unable to update the task. Try again!");
        }
    }

    const deleteTask = async (idTask) => {
        const oldTask = [...tasks];
        setTasks(prev => prev.filter(t => t.id !== idTask));

        try {
            const response = await authenticatedFetch(`/api/tasks/${idTask}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Delete error!");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting task. Try again!");
            setTasks(oldTask);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">Your activities</h1>
                    <p className="text-gray-500">Select a day to see what needs to be done.</p>
                </div>

                <div className="flex items-center justify-between mb-6 w-full">
                    
                    <div>
                        <DaySelector onDateChange={handleDateChange} />
                    </div>

                    <Link 
                        to="/add" 
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-200 flex items-center gap-2 shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <span className="font-bold text-sm sm:text-base">New Task</span>
                    </Link>
                </div>

                <div>
                    <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
                </div>
            </div>
        </div>
    );
}

export default VisualizeTasks;