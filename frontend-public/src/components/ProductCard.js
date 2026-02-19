import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      
      <button onClick={() => onViewDetails(product)} className="view-button">
        Ver más
      </button>
    </div>
  );
};

export default ProductCard;
