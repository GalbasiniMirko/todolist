import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DaySelector from "../components/DaySelector";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
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
            
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">Your activities</h1>
                    <p className="text-gray-500">Select a day to see what needs to be done.</p>
                </div>

                <DaySelector onDateChange={handleDateChange} />
                
                <div className="mt-6">
                    <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
                </div>
            </div>
        </div>
    );
}

export default VisualizeTasks;