import API from './api';

export const getAllOrders = async () => {
  const res = await API.get('/orders/admin'); // ✅ RUTA CORRECTA
  return res.data;
};
export const updateOrderStatus = async (orderId, status) => {
  const res = await API.put(`/orders/${orderId}/status`, { status });
  return res.data;
};