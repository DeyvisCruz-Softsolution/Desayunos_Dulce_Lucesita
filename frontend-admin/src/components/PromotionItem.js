// frontend/src/components/PromotionItem.js
import React from 'react';

const PromotionItem = ({ promo, onDelete, onToggle, onEdit }) => {
  const isVideo = promo.imageUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="promotion-card">
      {isVideo ? (
        <video className="promotion-media" controls>
          <source src={promo.imageUrl} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      ) : (
        <img src={promo.imageUrl} alt={promo.title} className="promotion-media" />
      )}
      <div className="promotion-details">
        <h3>{promo.title}</h3>
        <p>{promo.message}</p>
        <p><strong>Estado:</strong> {promo.isActive ? 'Activa ✅' : 'Inactiva ❌'}</p>
        <div className="promotion-actions">
          <button onClick={() => onEdit(promo)}>✏️ Editar</button>
          <button onClick={() => onToggle(promo.id, !promo.isActive)}>
            {promo.isActive ? 'Desactivar' : 'Activar'}
          </button>
          <button onClick={() => onDelete(promo.id)} className="delete-button">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default PromotionItem;
