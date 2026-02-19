import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../components/styles/promotionPopup.css';

const PromotionPopup = () => {
  const [promotion, setPromotion] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('promotionShown');
    if (alreadyShown) return;

    const fetchActivePromotion = async () => {
      try {
        const res = await API.get('/promotions/active');
        setPromotion(res.data);
        setVisible(true);
        sessionStorage.setItem('promotionShown', 'true');
      } catch (error) {
        console.error('❌ No hay promoción activa o error al obtenerla:', error);
      }
    };

    fetchActivePromotion();
  }, []);

  if (!promotion || !visible) return null;

  const handleClose = () => setVisible(false);

  return (
    
    <div className="promotion-popup-overlay" onClick={handleClose}>
      <div className="promotion-popup" onClick={e => e.stopPropagation()}>

                <div className="sparkle-container">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="sparkle" />
          ))}
        </div>
        <button className="close-btn" onClick={handleClose}>&times;</button>
        <h3>{promotion.title}</h3>
        <p>{promotion.message}</p>

        {promotion.imageUrl && promotion.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
          <video controls autoPlay muted loop className="promo-media">
            <source src={promotion.imageUrl} type="video/mp4" />
            Tu navegador no soporta el formato de video.
          </video>
        ) : (
          <img src={promotion.imageUrl} alt="Promoción" className="promo-media" />
        )}
      </div>
    </div>
  );
};

export default PromotionPopup;
