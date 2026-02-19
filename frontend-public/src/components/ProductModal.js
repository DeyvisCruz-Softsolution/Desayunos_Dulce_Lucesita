// ProductModal.js
import React, { useState, useMemo } from 'react';
import './styles/productModal.css';
import ImageZoom from 'react-image-zooom';
import { addToCart } from '../services/cartService';

const ProductModal = ({ product, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [generalDescription, contentItems] = useMemo(() => {
    if (!product) return ['', []];
    const parts = product.description.split(/Contenido\s*:/i);
    const general = parts[0]?.trim() || '';
    const items = parts[1]
      ? parts[1].split('\n').map(line => line.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
      : [];
    return [general, items];
  }, [product]);

  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(product.id, 1);
      setMessage('🛒 Producto agregado al carrito.');
      setTimeout(() => {
        setMessage('');
        onClose(); // ✅ Cierra el modal automáticamente después de agregar
      }, 1000); // Espera 1 segundo para mostrar el mensaje antes de cerrar
    } catch (error) {
      console.error('❌ Error al agregar al carrito:', error);
      setMessage('❌ No se pudo agregar al carrito.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-image-zoom">
          <ImageZoom
            src={product.imageUrl}
            alt={product.title}
            zoom="300"
            width={400}
            height={250}
          />
        </div>

        <h2>{product.title}</h2>
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>

        <div className="description-section">
          <p className="desc-label">📝 Descripción general:</p>
          <p>{generalDescription}</p>

          {contentItems.length > 0 && (
            <>
              <p className="desc-label">🎁 Contenido del artículo:</p>
              <ul className="content-list">
                {contentItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="modal-buttons">
          <button className="order-button" onClick={handleAddToCart} disabled={loading}>
            {loading ? 'Procesando...' : 'Agregar al carrito'}
          </button>
        </div>

        {message && <p className="order-message">{message}</p>}
      </div>
    </div>
  );
};

export default ProductModal;
