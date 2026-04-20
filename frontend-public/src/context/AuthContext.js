import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser
} from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar usuario al iniciar
  useEffect(() => {
    try {
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (err) {
      console.error('Error cargando usuario:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const userData = await loginService(email, password);
    setUser(userData);
    return userData;
  };

  // 🚪 LOGOUT
  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);