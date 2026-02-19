import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './styles/header.css';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  return (
    <header>
      <div className="header-container">
        <div className="brand">
          <Link to="/" className="logo-link">
            <img src="/logo.ico" alt="Logo Dulce Lucesita" className="logo-icon" />
            <span className="brand-text">Dulce Lucesita</span>
          </Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={menuOpen ? 'open' : ''} ref={navRef}>
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/shop" onClick={toggleMenu}>Tienda</Link>
          <Link to="/about" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/contact" onClick={toggleMenu}>Contacto</Link>
          <Link to="/checkout" onClick={toggleMenu} className="nav-cart-link">
            <ShoppingCart size={22} />
            <span>Carrito</span>
          </Link>
          <Link to="/profile" onClick={toggleMenu}>Mi perfil</Link>
          {user?.role === 'admin' && (
            <a
              href="http://localhost:3000/admin"
              className="admin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Administración
            </a>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={toggleMenu}>Login</Link>
              <Link to="/register" onClick={toggleMenu}>Registro</Link>
              
            </>
          ) : (
            <button onClick={() => { handleLogout(); toggleMenu(); }}>Cerrar sesión</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
