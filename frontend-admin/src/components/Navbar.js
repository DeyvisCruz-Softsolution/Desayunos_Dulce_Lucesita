import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="admin-navbar">
      <div>
        Bienvenido, {user?.name}
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
