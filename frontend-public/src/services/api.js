import axios from 'axios';

const API = axios.create({
  baseURL: 'https://desayunos-dulce-lucesita.onrender.com',
  headers: {
    'Content-Type': 'application/json', // ✅ Agregado
  },
});

// Agregar token a todas las peticiones si existe
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
