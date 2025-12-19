export const authenticatedFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        ...(accessToken ? {"Authorization": `Bearer ${accessToken}`} : {})
    };

    let response = await fetch(url, {...options, headers});

    if (response.status === 401) {
        console.log("Expired access token, refresh attempt...");

        const refreshToken = localStorage.getItem("refreshToken");
        if(!refreshToken) {
            window.location.href = "/login";
            return response;
        }

        try {
            const refreshResponse = await fetch("http://localhost:8080/api/auth/refresh", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();

                localStorage.setItem("token", data.accessToken);
                console.log("Token successfully updated!");

                const newHeaders = {
                    ...headers,
                    "Authorization": `Bearer ${data.accessToken}`,
                }

                response = await fetch(url, {...options, headers: newHeaders});
            } else {
                throw new Error("Invalid refresh token");
            }
        } catch (error) {
            console.error("Session expired:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
    }

    return response;
}