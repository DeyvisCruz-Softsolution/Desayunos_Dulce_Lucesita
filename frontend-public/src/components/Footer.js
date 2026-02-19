import React from 'react';

const Footer = () => {
  return (
    <footer style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 20px',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '14px',
  gap: '10px'
}}>
  <img
    src="/imagen_soft.jpg"
    alt="Logo Dulce Lucesita"
    style={{ height: '24px', width: 'auto' }}
  />
  <p style={{ margin: 0 }}>
    Copyright © {new Date().getFullYear()} Dulce Lucesita. Todos los derechos reservados.
  </p>
</footer>

  );
};

export default Footer;
