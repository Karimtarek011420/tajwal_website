"use client";

import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic"; // تعطيل التوليد المسبق

const NotFoundPage = () => {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("someKey");
      setStoredValue(value);
    }
  }, []);

  return (
    <div>
      <h1>الصفحة غير موجودة</h1>
      {storedValue && <p>القيمة المخزنة: {storedValue}</p>}
    </div>
  );
};

export default NotFoundPage;
