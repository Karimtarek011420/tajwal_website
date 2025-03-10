"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackagepur] = useState(null);
  useEffect(() => {
    const storedPackage = localStorage.getItem("package");
    try {
      if (storedPackage) {
        const parsedPackage = JSON.parse(storedPackage);
        if (typeof parsedPackage === "object" && parsedPackage !== null) {
          setSelectedPackagepur(parsedPackage);
        }
      }
    } catch (error) {
      console.error("خطأ أثناء قراءة البيانات من localStorage:", error);
    }
  }, []);

  // تحديث localStorage عند تغيير selectedPackage
  useEffect(() => {
    try {
      if (selectedPackage && typeof selectedPackage === "object") {
        localStorage.setItem("package", JSON.stringify(selectedPackage));
      }
    } catch (error) {
      console.error("خطأ أثناء حفظ البيانات في localStorage:", error);
    }
  }, [selectedPackage]);
  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackagepur }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);
