import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api", // Ajusta la URL según tu backend
    withCredentials: true, // Si usas cookies
});

// Interceptor para agregar el token automáticamente a cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
