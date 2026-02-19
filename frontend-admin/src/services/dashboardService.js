import axios from 'axios';

export const getDashboardData = async (params = {}) => {
  const res = await axios.get('https://desayunos-dulce-lucesita.onrender.com/api/dashboard', { params });
  return res.data;
};
