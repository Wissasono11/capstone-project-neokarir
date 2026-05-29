import axios from 'axios';

// Base URL for the main backend API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Base URL for the AI model service
export const AI_BASE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000';

// Global flag to toggle mock data (handy for working without running backend)
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === undefined;

// Axios instance for main backend API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for Request to inject auth token
api.interceptors.request.use(
  (config) => {
    // Aligned with neokarir_auth_token key in AuthContext.jsx
    const token = localStorage.getItem('neokarir_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for Response to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      
      // Auto token refresh placeholder (or logout if expired)
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.warn('Unauthorized. Silakan login kembali.');
        // If there's a token refresh endpoint, call it here. Otherwise redirect/logout can be handled.
      }
    } else if (error.request) {
      console.error('Network Error: Server tidak merespon (Mungkin Backend belum jalan)');
    } else {
      console.error('Error Setup:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
