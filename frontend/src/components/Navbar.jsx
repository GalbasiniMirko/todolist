import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="text-2xl font-extrabold text-indigo-600">
                <NavLink to="/homepage">ToDoList</NavLink>
            </div>
            <div className="flex gap-6 text-lg font-medium">
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
            </div>
        </nav>
    );
}

export default Navbar;