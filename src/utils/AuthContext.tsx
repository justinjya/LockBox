import React, { createContext, useState } from 'react';

interface AuthContextData {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({ isLoggedIn: false, logIn: () => {}, logOut: () => {} });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};