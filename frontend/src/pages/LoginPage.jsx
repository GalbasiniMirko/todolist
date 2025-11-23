import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    const [isShown, setIsShown] = useState(false);

    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={isShown ? "text" : "password"}
                            className="border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
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
                      Login
                    </button>

                    <p className="text-center text-sm mt-3">
                        Non hai un account?{" "}
                        <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
