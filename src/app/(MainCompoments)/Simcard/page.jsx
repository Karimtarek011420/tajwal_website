"use client";
import React, { useEffect, useState } from "react";
import "./Simcard.css";
import Importantwarning from "@/assets/images/Importantwarning.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
function SimcardPage() {
  const [selectedOption, setSelectedOption] = useState("qr");
  return (
    <div className="Simcard  position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5">طريقة تثبيت الشريحة</span>
          </li>
        </ul>
      </div>
      <div className=" container py-5 bg-white shadow-sm rounded-3 position-relative mt-5">
        <div className="position-absolute Simcarchoose  d-flex justify-content-center align-items-center">
          <button
            className={`Simcard-list-links ${
              selectedOption === "qr" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("qr")}
          >
            رمز QR
          </button>
          <button
            className={`Simcard-list-links ${
              selectedOption === "manual" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("manual")}
          >
            يدوي
          </button>
        </div>
        <div className="row gy-3 justify-content-center align-items-center  px-md-5">
          <div className="col-12 col-md-6  text-center">
            <Image
              src={Importantwarning}
              alt="Importantwarning"
              className="img-fluid "
            />
            <div>lll</div>
          </div>
          <div className="col-12 col-md-6">
            {/* يمكن إضافة محتوى إضافي هنا */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(SimcardPage);
