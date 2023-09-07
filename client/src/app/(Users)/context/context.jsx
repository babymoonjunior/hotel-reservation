"use client";
import React, { useState, createContext } from "react";

const AuthContext = createContext({});

function AuthProvider(prop) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{ modalOpen, setModalOpen, currentIndex, setCurrentIndex }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
