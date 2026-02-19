import API from './api';

export const getAllUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};
