import API from './api';

export const createProduct = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('price', data.price);
  if (data.image) formData.append('image', data.image);

  await API.post('/products', formData);
};

export const getProductById = async (id) => {
  const res = await API.get('/products');
  return res.data.find(p => p.id === parseInt(id));
};

export const updateProduct = async (id, data) => {
  // Update logic if backend supports PUT or PATCH
};
