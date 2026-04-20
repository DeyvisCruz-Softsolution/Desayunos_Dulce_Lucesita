import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://desayunos-dulce-lucesita.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 🔐 Enviar token SIEMPRE
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Manejo de errores
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: 'Servidor no disponible' });
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error.response.data || { message: 'Error' });
  }
);

export default API;