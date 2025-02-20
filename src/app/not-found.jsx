import React from "react";
import Header from "./_Compontents/Header/Header";
import Footer from "./_Compontents/Footer/Footer";
import footerimage from "@/assets/images/5052790.webp";
import Image from "next/image";
// import './_Compontents/Footer/footer.css'

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className=" d-flex justify-content-center align-items-center py-2">
        <Image src={footerimage} alt="iconcountry" className=" text-white imgnotfound " />
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
