export const VITE_API_BASE_URL= import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const authenticatedFetch = async (endpoint, options = {}) => {
    const url = endpoint.startsWith("http") ? endpoint : `${VITE_API_BASE_URL}${endpoint}`;

    const fetchOptions = {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        }
    };

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        console.log("Expired access token, refresh attempt...");

        try {
            const refreshResponse = await fetch(`${VITE_API_BASE_URL}/api/auth/refresh`, {
                method: "POST",
                credentials: "include"
            });

            if (refreshResponse.ok) {
                console.log("Token successfully updated!");

                response = await fetch(url, fetchOptions);
            } else {
                throw new Error("Invalid refresh token");
            }
        } catch (error) {
            console.error("Session expired:", error);
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
        }
    }

    return response;
}