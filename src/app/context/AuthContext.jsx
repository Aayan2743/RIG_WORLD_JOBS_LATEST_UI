import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('rwj_user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });
  const [token, setToken] = useState(localStorage.getItem('rwj_token'));

  const login = (newToken, newUser) => {
    localStorage.setItem('rwj_token', newToken);
    localStorage.setItem('rwj_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('rwj_token');
    localStorage.removeItem('rwj_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
