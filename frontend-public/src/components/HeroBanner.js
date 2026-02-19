import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <h1>Dulce Lucesita</h1>
      <p>Desayunos y detalles personalizados para cada ocasión</p>
      <Link to="/shop">
        <button>Explorar Productos</button>
      </Link>
    </section>
  );
};

export default HeroBanner;
