import axios from 'axios';

// Base URL for the main backend API
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Base URL for the AI model service (Recommendations, Skill Gap, Market)
export const AI_BASE_URL = import.meta.env.VITE_AI_URL;

// Base URL for the AI-1 model service (Chatbot)
export const AI1_BASE_URL = import.meta.env.VITE_AI1_URL;

// Global flag to toggle mock data (handy for working without running backend)
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Axios instance for main backend API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
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
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.warn('Unauthorized. Silakan login kembali.');
        // Dispatch custom event to notify AuthContext to clear credentials and redirect
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
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
