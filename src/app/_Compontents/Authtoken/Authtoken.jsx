"use client";
import { createContext, useEffect, useState } from "react";

export const authtoken = createContext();

export default function AuthTokenProvider({ children }) {
  const [token, settoken] = useState(null);
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      settoken(storedToken);
    }
    setLoading(false); // إنهاء التحميل بعد التحقق
  }, []);

  if (loading) {
    return <div className=" d-flex justify-content-center align-items-center py-5 vh-100">Loading...</div>; // عرض شاشة تحميل مؤقتة
  }

  return (
    <authtoken.Provider value={{ settoken, token }}>
      {children}
    </authtoken.Provider>
  );
}
