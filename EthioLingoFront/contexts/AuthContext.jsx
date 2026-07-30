import React, { createContext, useState, useContext, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await StorageService.getToken();
      if (token) {
        setUser({ email: 'hailegetaneh1221@gmail.com', name: 'Hailemeskel' });
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    await StorageService.saveToken('dummy-jwt-token');
    setUser({ email, name: 'Hailemeskel' });
  };

  const logout = async () => {
    await StorageService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
