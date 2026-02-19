import API from './api';

export const login = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const register = async (name, email, password) => {
  const res = await API.post('/auth/register', { name, email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
