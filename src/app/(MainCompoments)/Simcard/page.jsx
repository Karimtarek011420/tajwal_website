"use client";
import React, { useState } from "react";
import "./Simcard.css";
import Importantwarning from "@/assets/images/Importantwarning.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
function SimcardPage() {
  const [selectedOption, setSelectedOption] = useState("qr");
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const checkedCount = checkedItems.filter(Boolean).length; // عدد المحددين
  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  const checkboxLabels = [
    "اطلعت على كامل التعليمات لتثبيت الشريحة .",
    "انا على علم انه في حال تم حذف الشريحة او التوقف اثناء تثبيت الشريحة، فانه لن اتمكن من اعادة تثبيتها مره اخرى.",
    "اتفهم انني لن أقوم بتفعيل خيار “تجوال البيانات” الا عند الوصول للدولة المحددة.",
  ];
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
      <div className="container py-5 bg-white shadow-sm rounded-3 position-relative mt-5">
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
                border:
                  checkedCount === checkedItems.length
                    ? "1px solid var(--primary-color)" // ✅ أخضر إذا كانت كل الـ Checkboxes محددة
                    : "1px solid #dc3545", // ❌ أحمر إذا كان هناك واحدة غير محددة
                transition: "border 0.3s ease-in-out",
              }}
            >
              {checkedItems.map((isChecked, index) => (
                <div className="compatibility-check d-flex " key={index}>
                  <label className="custom-checkbox pt-lg-1 ">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(index)}
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
                  </label>
                  <p>{checkboxLabels[index]}</p>
                </div>
              ))}
            </div>
            <div>{checkedItems.every(Boolean) ? <p>llll</p> : <p>kkk</p>}</div>
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
