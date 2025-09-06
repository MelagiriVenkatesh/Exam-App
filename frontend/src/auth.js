import axios from 'axios';

export const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    
    try {
        const isTokenValidUrl = import.meta.env.VITE_TOKEN_API_URL;
        // Make the API call to your new backend endpoint
        await axios.get(isTokenValidUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        // If the request succeeds (doesn't throw an error), the token is valid
        return true;
    } catch (error) {
        // If the server returns 401, axios will throw an error, which will be catched here.
        console.error("Token validation failed:", error.response?.data?.message || error.message);
        localStorage.removeItem('token'); // Cleaning up invalid token.
        return false;
    }
};