// src/components/WhatsappButton.js
import React from 'react';
import '../components/styles/WhatsappButton.css';

const WhatsappButton = () => {
  const phone = '+573153411850'; // Reemplaza por el número de tu empresa

  return (
    <a
      href={`https://wa.me/${phone}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
    
      <img
        src="./ChatGPT.png" // Asegúrate de que la ruta sea correcta
        alt="Chat en WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsappButton;
