import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DaySelector from "../components/DaySelector";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

function VisualizeTasks() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const handleDateChange = (isoDate) => {
        setSelectedDate(isoDate);
    };

    useEffect(() => {
        if (!selectedDate) return;

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:8080/api/tasks/${selectedDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status === 401) {
                console.error("Invalido or expired token");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/login");
                throw new Error("Unauthorized");
            }
            if (!res.ok) throw new Error("Fetch error");
            return res.json();
        })
        .then(data => {
            setTasks(data.tasks || []);
        })
        .catch(err => {
            console.error("Network or authentication error", err);
        });

    }, [selectedDate, navigate]);

    const toggleTask = async (taskId, currentState) => {

        const newState = currentState === "To do" ? "Done" : "To do";
        setTasks(prevTask => prevTask.map(task => 
            task.id === taskId ? {...task, state: newState} : task
        ));

        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({state: newState})
            });

            if (!response.ok) {
                throw new Error("Update error");
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Unable to update the task. Try again!");
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
                    <TaskList tasks={tasks} onToggle={toggleTask} />
                </div>
            </div>
        </div>
    );
}

export default VisualizeTasks;