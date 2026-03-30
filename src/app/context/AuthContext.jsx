// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const raw = localStorage.getItem('rwj_user');
//     if (!raw) return null;
//     try { return JSON.parse(raw); } catch { return null; }
//   });
//   const [token, setToken] = useState(localStorage.getItem('rwj_token'));

//   const login = (newToken, newUser) => {
//     localStorage.setItem('rwj_token', newToken);
//     localStorage.setItem('rwj_user', JSON.stringify(newUser));
//     setToken(newToken);
//     setUser(newUser);
//   };

//   const logout = () => {
//     localStorage.removeItem('rwj_token');
//     localStorage.removeItem('rwj_user');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// }



import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api'; // 👈 important

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // ✅ attach token on reload
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // ✅ LOGIN
  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    // set axios header globally
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

    setToken(newToken);
    setUser(newUser);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common['Authorization'];

    setToken(null);
    setUser(null);

    // redirect
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ HOOK
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}