import API from './api';

export const fetchProducts = async () => {
  const res = await API.get('/products');
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await API.get('/products');
  return res.data.find(p => p.id === parseInt(id));
};

// ✅ Nueva función para obtener productos por categoría
export const fetchProductsByCategory = async (category) => {
  const res = await API.get(`/products/category/${category}`);
  return res.data;
};
export const updateProduct = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('category', data.category); // ✅ NUEVO
  if (data.image) formData.append('image', data.image);

  await API.put(`/products/${id}`, formData);
}