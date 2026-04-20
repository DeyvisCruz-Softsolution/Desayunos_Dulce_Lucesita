import API from './api';

// 🔐 LOGIN
export const login = async (email, password) => {
  try {
    const res = await API.post('/auth/login', { email, password });

    const { token, user } = res.data;

    if (!token || !user) {
      throw new Error('Respuesta inválida del servidor');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    console.error('Error en login:', error);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

// 📝 REGISTER
export const register = async (name, email, password, phone, address, city) => {
  try {
    const res = await API.post('/auth/register', {
      name,
      email,
      password,
      phone,
      address,
      city,
    });

    return res.data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw new Error(error.message || 'Error al registrar usuario');
  }
};

// 🚪 LOGOUT
export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// 👤 OBTENER USUARIO
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return null;
  }
};

// 🔍 VALIDAR AUTH
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};