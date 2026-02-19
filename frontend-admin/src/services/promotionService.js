// frontend/src/services/promotionService.js
import API from './api';

export const getPromotions = async () => {
  const res = await API.get('/promotions');
  return res.data;
};

export const createPromotion = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('message', data.message);
  formData.append('isActive', data.isActive || false);
  if (data.file) {
    formData.append('file', data.file);
  }

  const res = await API.post('/promotions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const updatePromotion = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('message', data.message);
  formData.append('isActive', data.isActive || false);
  if (data.file) {
    formData.append('file', data.file);
  } else if (data.imageUrl) {
    formData.append('imageUrl', data.imageUrl);
  }

  const res = await API.put(`/promotions/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const deletePromotion = async (id) => {
  await API.delete(`/promotions/${id}`);
};

export const togglePromotionActive = async (id, isActive) => {
  const res = await API.put(`/promotions/${id}/toggle`, { isActive });
  return res.data;
};
