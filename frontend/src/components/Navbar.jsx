import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
            try {
                await fetch(`http://localhost:8080/api/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ refreshToken })
                });
            } catch (error) {
                console.error("Logout server error:", error);
            }
        }

        localStorage.removeItem("token"); 
        localStorage.removeItem("refreshToken");

        navigate("/login");
    }

    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="text-2xl font-extrabold text-indigo-600">
                <NavLink to="/homepage">ToDoList</NavLink>
            </div>
            
            <div className="flex gap-6 items-center text-lg font-medium">
                <NavLink
                    to="/homepage"
                    className={({ isActive }) =>
                        isActive
                            ? "text-indigo-600 border-b-2 border-indigo-600"
                            : "text-gray-500 hover:text-indigo-600 transition"
                    }
                >
                    Visualize Tasks
                </NavLink>
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        isActive
                            ? "text-indigo-600 border-b-2 border-indigo-600"
                            : "text-gray-500 hover:text-indigo-600 transition"
                    }
                >
                    Add Task
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-red-200 font-bold"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;