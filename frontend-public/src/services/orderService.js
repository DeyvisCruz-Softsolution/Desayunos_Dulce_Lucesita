import API from './api';

// ✅ Crear pedido directo (desde un producto)
export const createOrder = async (productId, quantity = 1) => {
  const res = await API.post('/orders', { productId, quantity });
  return res.data;
};

// ✅ Crear pedido desde carrito
export const createOrderFromCart = async (formData) => {
  const res = await API.post('/orders/create-from-cart', formData);
  return res.data;
};

// ✅ Obtener pedidos del usuario (USADO EN FRONTEND PUBLIC)
export const getUserOrders = async () => {
  const res = await API.get('/orders/mis-pedidos');
  return res.data;
};

// ⚠️ NO USADO ACTUALMENTE (posible uso en admin o backend legacy)
export const getMyOrders = async () => {
  const res = await API.get('/orders/mine');
  return res.data;
};