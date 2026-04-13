import axios from 'axios';

export const getDashboardV2 = async () => {
  const res = await axios.get('https://desayunos-dulce-lucesita.onrender.com/api/dashboard-v2');
  return res.data;
};