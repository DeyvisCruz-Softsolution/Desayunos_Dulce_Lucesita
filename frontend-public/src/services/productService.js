import API from './api';

// ✅ Obtener todos los productos
export const fetchProducts = async () => {
  const res = await API.get('/products');
  return res.data;
};

// ⚠️ TEMPORAL (porque backend NO tiene /products/:id)
export const fetchProductById = async (id) => {
  const res = await API.get('/products');
  return res.data.find(p => p.id === parseInt(id));
};

// ✅ Obtener productos por categoría
export const fetchProductsByCategory = async (category) => {
  const res = await API.get(`/products/category/${category}`);
  return res.data;
};

// ⚠️ Uso administrativo (subida con imagen)
export const updateProduct = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('price', data.price);
  formData.append('category', data.category);

  if (data.image) {
    formData.append('image', data.image);
  }

  const res = await API.put(`/products/${id}`, formData);
  return res.data;
};