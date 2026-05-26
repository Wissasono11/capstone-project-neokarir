import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor untuk Request
 * Berguna untuk menyisipkan token otentikasi di setiap request nanti (kalau ada fitur login)
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor untuk Response
 * Berguna untuk menangani error secara global
 */
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        console.warn('Unauthorized. Silakan login kembali.');
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
