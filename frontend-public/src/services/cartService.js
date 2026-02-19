import API from './api';

export const addToCart = async (productId, quantity = 1) => {
  const res = await API.post('/cart', { productId, quantity });
  return res.data;
};

export const getCart = async () => {
  const res = await API.get('/cart');
  return res.data;
};

export const removeFromCart = async (itemId) => {
  return await API.delete(`/cart/${itemId}`);
};

export const clearCart = async () => {
  return await API.delete('/cart');
};

export const updateCartItem = async (itemId, quantity) => {
  return await API.put(`/cart/${itemId}`, { quantity });
};
export const getCartItems = async () => {
  const res = await API.get('/cart');
  return res.data;
};

