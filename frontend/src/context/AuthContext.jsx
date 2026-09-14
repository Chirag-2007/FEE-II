import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // localStorage.getItem is synchronous, so there's no real "loading" period —
  // read it straight into the initial state (same pattern as ThemeContext),
  // instead of an effect that sets state a moment after the first render.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Kept for compatibility with ProtectedRoute/DashboardLayout, which both
  // check it — always false now since there's nothing async to wait for.
  const [loading] = useState(false);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}