"use client";

import { createContext, useState, useEffect } from "react";

export const authtoken = createContext();

export default function AuthTokenProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  return (
    <authtoken.Provider value={{ token, setToken }}>
      {children}
    </authtoken.Provider>
  );
}
