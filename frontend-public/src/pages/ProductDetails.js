import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products`)
      .then(res => {
        const found = res.data.find(p => p.id === parseInt(id));
        if (found) setProduct(found);
      })
      .catch(err => console.error('Error al obtener el producto', err));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetails;
