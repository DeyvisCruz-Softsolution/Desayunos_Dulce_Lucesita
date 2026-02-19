// src/services/profileService.js
import API from './api';

export const getUserProfile = async () => {
  const res = await API.get('/users/profile');
  return res.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await API.put('/users/profile', profileData);
  return res.data;
};
