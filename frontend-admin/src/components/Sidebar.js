import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Productos', path: '/products', icon: '📦' },
    { name: 'Pedidos', path: '/orders', icon: '🧾' },
    { name: 'Usuarios', path: '/users', icon: '👤' },
    { name: 'Promociones', path: '/promotions', icon: '🎁' }
  ];

  return (
    <>
      {/* BOTÓN MOBILE */}
      <button
        onClick={() => setOpen(!open)}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* OVERLAY (modo pro) */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h2 style={{ marginBottom: '30px' }}>🚀 Lucesita</h2>

        <nav>
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '10px',
                textDecoration: 'none',
                color: location.pathname === item.path ? '#111827' : '#fff',
                background: location.pathname === item.path ? '#fff' : 'transparent',
                fontWeight: '500'
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;