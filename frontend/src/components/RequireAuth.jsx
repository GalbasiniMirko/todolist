import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RequireAuth() {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            console.log("Expired token, redirect to login");

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    } catch(error) {
        console.error("Invalid token: ", error);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />
}

export default RequireAuth;