import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

function SignupPage() {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords are different");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error during registration");
            }

            alert("Successfull registration!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Sign up</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={isShown ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium" htmlFor="confirmPassword">Repeat password</label>
                        <input
                            id="confirmPassword"
                            type={isShown ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        <input 
                            id="checkbox"
                            type="checkbox"
                            checked={isShown}
                            onChange={togglePassword}
                            className="border rounded-xl bg-blue-600" />
                        <label htmlFor="checkbox">Show password?</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl mt-2 shadow text-lg hover:bg-blue-700 transition"
                    >
                        Sign up
                    </button>

                    <p className="text-center text-sm mt-3">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;