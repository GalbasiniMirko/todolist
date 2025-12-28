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
            
            <div className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">
                <NavLink to="/homepage">ToDoList</NavLink>
            </div>
            
            <div>
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-red-200 font-bold flex items-center gap-2"
                >
                    Logout
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;