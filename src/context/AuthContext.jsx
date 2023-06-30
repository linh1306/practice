import React, { createContext, useEffect, useState } from "react";
import { auth, getById, getData } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status,setStatus] = useState(false);
  const [admin,setAdmin] = useState(false)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async(user) => {
      if (user) {
        const dataUserFirebase = await getData("user","account",user.email)
        if(dataUserFirebase){
          setStatus(dataUserFirebase[0].status)
          setAdmin(dataUserFirebase[0].auth === 'admin')
        }
        setUser(user);
      }
      return () => {
        unsubscribe();
      };
    }, []);
  });
  return (
    <AuthContext.Provider value={{ user, setUser, status, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
