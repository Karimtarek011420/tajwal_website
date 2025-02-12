import React from "react";
import Header from "./_Compontents/Header/Header";
import Footer from "./_Compontents/Footer/Footer";
import footerimage from "@/assets/images/5052790.webp";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className=" d-flex justify-content-center align-items-center py-2">
        <Image src={footerimage} alt="iconcountry" className=" text-white" />
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
