import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  const handleUpdate = async (data) => {
    await updateProduct(id, data);
    navigate('/products');
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Editar Producto</h2>
      <ProductForm onSubmit={handleUpdate} initialData={product} />
    </div>
  );
};

export default EditProduct;
