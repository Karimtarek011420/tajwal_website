import React from "react";
import Header from "./_Compontents/Header/Header";
import Footer from "./_Compontents/Footer/Footer";
import footerimage from "@/assets/images/5052790.webp";
import Image from "next/image";
import Link from "next/link";
// import './_Compontents/Footer/footer.css'

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="position-relative pt-5">
        <div className="position-absolute country-listbeginall w-100">
          <ul className="list-unstyled d-flex justify-content-center align-items-center">
            <Link
              href={"/Countries"}
              className="country-list-links text-white  mx-2"
            >
              دولية
            </Link>
            <Link
              href="/continents"
              className="country-list-links text-white mx-2"
            >
              قارية
            </Link>
            <Link href="/world" className="country-list-links text-white mx-2">
              عالمية
            </Link>
          </ul>
        </div>
      </div>
      <div className=" d-flex justify-content-center align-items-center py-2">
        <Image
          src={footerimage}
          alt="iconcountry"
          className=" text-white imgnotfound "
          priority
        />
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
