import React, { createContext, useEffect, useState } from "react";
import { addData, auth, getById, getData } from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(false);
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const dataUserFirebase = await getData("user", "account", userAuth.email)
        if (dataUserFirebase) {
          setStatus(dataUserFirebase[0].status)
          setAdmin(dataUserFirebase[0].auth === 'admin')
        }
        setUser(userAuth);
      }
    })
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, status, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
