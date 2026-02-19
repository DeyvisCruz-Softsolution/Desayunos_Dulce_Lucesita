import API from './api';

export const getActivePromotion = async () => {
  const res = await API.get('/promotions/active');
  return res.data;
};
