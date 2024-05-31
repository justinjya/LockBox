import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextData {
  user: any;
}

export const AuthContext = createContext<AuthContextData>({ user: null });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};