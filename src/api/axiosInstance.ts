import axios from 'axios';
import { getRefreshTokenHandler } from './tokenManager';

// Create an Axios instance with base configuration
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add a request interceptor to add the token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add the response and token refresh interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshTokenHandler();
                if (refreshToken) {
                    // Attempt to refresh the token
                    await refreshToken();

                    // Retry the original request with the new token
                    const storedToken = localStorage.getItem('jwtToken');
                    originalRequest.headers['Authorization'] = `Bearer ${storedToken}`;

                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, clear tokens and redirect
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('refreshToken');
                // Redirect to login page
                window.location.href = '/';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;