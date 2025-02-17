"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token"); // جلب التوكن من LocalStorage

      if (!token) {
        router.replace("/Login"); // إعادة التوجيه إذا لم يكن هناك توكن
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, []);

    if (loading) return <p>جارٍ التحقق من الجلسة...</p>; // عرض رسالة تحميل

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
