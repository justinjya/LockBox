import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface AuthContextData {
  user: any;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
}

export const AuthContext = createContext<AuthContextData>({ user: null, name: null, email: null, phoneNumber: null });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const querySnapshot = getDocs(collection(db, 'users'));
        querySnapshot.then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === user.uid) {
              setUser(user);
              setName(doc.data().name);
              setEmail(doc.data().email);
              setPhoneNumber(doc.data().phoneNumber);
            }
          });
        });
      } else {
        setUser(null);
        setName(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, name, email, phoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};