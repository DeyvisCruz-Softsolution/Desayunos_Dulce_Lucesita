import axios from 'axios';

// 🌐 Base URL dinámica
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://desayunos-dulce-lucesita.onrender.com/api',
  timeout: 10000,
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Asegura headers siempre
      config.headers['Content-Type'] = 'application/json';
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔴 ERROR DE RED
    if (!error.response) {
      console.error('Error de red o servidor no disponible');

      return Promise.reject({
        message: 'No se pudo conectar con el servidor.',
        isNetworkError: true,
      });
    }

    const { status, data } = error.response;

    // 🔐 401 → sesión expirada
    if (status === 401) {
      console.warn('Sesión expirada o no autorizada');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // 🚫 403
    if (status === 403) {
      console.warn('Acceso denegado');
    }

    // 🔥 500+
    if (status >= 500) {
      console.error('Error interno del servidor');
    }

    // 📩 ERROR NORMALIZADO (MEJORADO)
    return Promise.reject({
      status,
      message: data?.message || 'Ocurrió un error inesperado.',
      originalError: error, // 👈 clave para debugging real
    });
  }
);

export default API;