import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createProduct(data);
    navigate('/products');
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default AddProduct;
