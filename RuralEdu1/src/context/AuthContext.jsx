import { useMemo, useState } from 'react';
import AuthContext from './authContext';

const storageKey = 'ruralEduAuth';

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());

  const login = (authPayload) => {
    setUser(authPayload);
    window.localStorage.setItem(storageKey, JSON.stringify(authPayload));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(storageKey);
  };

  const value = useMemo(
    () => ({
      user,
      token: user?.token || '',
      isAuthenticated: Boolean(user?.token),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
