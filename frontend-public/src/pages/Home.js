import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero principal */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Bienvenido a Dulce Lucesita</h2>
            <h4>
              Sorprende con detalles únicos y personalizados para cada ocasión
            </h4>
            <p>
              En Dulce Lucesita transformamos emociones en experiencias. Desayunos sorpresa,
              velas aromáticas, regalos personalizados y decoración que hacen especial cada momento.
            </p>
            <div className="hero-buttons">
              <a href="/shop" className="btn-primary">Ver productos</a>
              <a href="/about" className="btn-outline">Conocer más</a>
            </div>
          </div>
          <div className="hero-video">
            <video
              src="https://res.cloudinary.com/dwzxkhn87/video/upload/v1748833455/publicidad1_xdjzi8.mp4"
              autoPlay
              muted
              controls
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎁 Detalles con amor</h3>
            <p>Productos cuidadosamente seleccionados y personalizados con elegancia.</p>
          </div>
          <div className="feature-card">
            <h3>🚚 Envíos rápidos</h3>
            <p>Llevamos tus sorpresas donde las necesites, justo a tiempo.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Pago seguro</h3>
            <p>Protegemos tus datos con métodos de pago confiables.</p>
          </div>
          <div className="feature-card">
            <h3>💬 Soporte 24/7</h3>
            <p>Estamos para ti en cualquier momento, sin importar la hora.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
