import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    toggleMenu();
    logout(); // 🔥 AuthContext ya maneja redirección
  };

  return (
    <header>
      <div className="header-container">
        
        {/* LOGO */}
        <div className="brand">
          <Link to="/" className="logo-link">
            <img src="/logo.ico" alt="Logo Dulce Lucesita" className="logo-icon" />
            <span className="brand-text">Dulce Lucesita</span>
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* NAV */}
        <nav className={menuOpen ? 'open' : ''} ref={navRef}>
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/shop" onClick={toggleMenu}>Tienda</Link>
          <Link to="/about" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/contact" onClick={toggleMenu}>Contacto</Link>

          <Link to="/checkout" onClick={toggleMenu} className="nav-cart-link">
            <ShoppingCart size={22} />
            <span>Carrito</span>
          </Link>

          {user && (
            <Link to="/profile" onClick={toggleMenu}>Mi perfil</Link>
          )}

          {/* ADMIN */}
          {user?.role === 'admin' && (
            <a
              href={process.env.REACT_APP_ADMIN_URL || 'https://tu-admin.vercel.app'}
              className="admin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Administración
            </a>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login" onClick={toggleMenu}>Login</Link>
              <Link to="/register" onClick={toggleMenu}>Registro</Link>
            </>
          ) : (
            <>
              <span className="user-name">👤 {user.name}</span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;