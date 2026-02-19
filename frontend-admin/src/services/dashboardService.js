import axios from 'axios';

export const getDashboardData = async (params = {}) => {
  const res = await axios.get('http://localhost:5000/api/dashboard', { params });
  return res.data;
};
