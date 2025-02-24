"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackagepur] = useState(null);
  useEffect(() => {
    const storedPackage = localStorage.getItem("package");
    if (storedPackage) {
      setSelectedPackagepur(JSON.parse(storedPackage));
    }
  }, []);

  // تحديث localStorage عند تغيير selectedPackage
  // useEffect(() => {
  //   console.log(selectedPackage)
  //   if (selectedPackage) {
  //     localStorage.setItem("package", JSON.stringify(selectedPackage));
  //   }
  // }, [selectedPackage]);
  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackagepur }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);
