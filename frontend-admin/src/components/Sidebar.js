import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/products">Productos</Link></li>
        <li><Link to="/orders">Pedidos</Link></li>
        <li><Link to="/users">Usuarios</Link></li>
        <li><Link to="/promotions">🎁 Promociones</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
