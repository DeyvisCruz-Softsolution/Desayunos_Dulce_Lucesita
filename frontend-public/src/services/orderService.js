import API from './api';

export const createOrder = async (productId, quantity = 1) => {
  const res = await API.post('/orders', { productId, quantity });
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get('/orders/mine');
  return res.data;
};
export const createOrderFromCart = async (formData) => {
  const res = await API.post('/orders/create-from-cart', formData); // formData contiene nombre, telefono, descripcion
  return res.data;
};
export const getUserOrders = async () => {
  const res = await API.get('/orders/mis-pedidos');
  return res.data;
};