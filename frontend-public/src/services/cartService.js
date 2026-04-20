import API from './api';

// ✅ Agregar producto al carrito
export const addToCart = async (productId, quantity = 1) => {
  const res = await API.post('/cart', { productId, quantity });
  return res.data;
};

// ✅ Obtener carrito (única función oficial)
export const getCart = async () => {
  const res = await API.get('/cart');
  return res.data;
};

// ✅ Eliminar item del carrito
export const removeFromCart = async (itemId) => {
  const res = await API.delete(`/cart/${itemId}`);
  return res.data;
};

// ✅ Vaciar carrito completo
export const clearCart = async () => {
  const res = await API.delete('/cart');
  return res.data;
};

// ✅ Actualizar cantidad de un producto
export const updateCartItem = async (itemId, quantity) => {
  const res = await API.put(`/cart/${itemId}`, { quantity });
  return res.data;
};