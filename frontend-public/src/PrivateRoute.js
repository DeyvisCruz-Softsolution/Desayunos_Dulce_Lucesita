import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Si no hay token, redirige al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si se requieren roles y el rol del usuario no es válido, redirige
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
