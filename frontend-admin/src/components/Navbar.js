import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      width: '100%',
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>

      {/* IZQUIERDA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>📊 Admin</h2>
      </div>

      {/* DERECHA */}
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            cursor: 'pointer',
            background: '#f3f4f6',
            padding: '8px 12px',
            borderRadius: '10px'
          }}
        >
          👤 {user?.name}
        </div>

        {open && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '45px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '10px',
            minWidth: '160px'
          }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

    </header>
  );
};

export default Navbar;