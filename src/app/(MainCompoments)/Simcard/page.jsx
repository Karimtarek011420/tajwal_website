"use client";
import React, { useState } from "react";
import "./Simcard.css";
import Importantwarning from "@/assets/images/Importantwarning.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
function SimcardPage() {
  const [selectedOption, setSelectedOption] = useState("qr");
  const [isChecked, setIsChecked] = useState(false);
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
          <div className="col-12 col-md-5 d-flex flex-column align-items-center text-center">
            <div className="equal-width">
              <Image
                src={Importantwarning}
                alt="Importantwarning"
                className="img-fluid"
              />
            </div>
            <div
              className="equal-width bg-white shadow-sm rounded-3 pb-2 pt-1 px-4 my-3"
              style={{
                border: isChecked
                  ? "1px solid var(--primary-color)"
                  : "1px solid #dc3545",
                transition: "border 0.3s ease-in-out",
              }}
            >
              {[1, 2, 3].map((_, index) => (
                <div className="compatibility-check" key={index}>
                  <label className="custom-checkbox pt-lg-1 d-flex">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span
                      className="checkmark"
                      style={{
                        border: isChecked
                          ? "1px solid var(--primary-color)"
                          : "1px solid #dc3545",
                        transition: "border 0.3s ease-in-out",
                      }}
                    ></span>
                    <p>أوافق أنني اطلعت على</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-7">
            {/* يمكن إضافة محتوى إضافي هنا */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(SimcardPage);
