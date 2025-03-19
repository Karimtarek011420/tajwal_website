"use client";
import React, { useState } from "react";
import "./Simcard.css";
import Importantwarning from "@/assets/images/Importantwarning.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
function SimcardPage() {
  const [selectedOption, setSelectedOption] = useState("qr");
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const searchParams = useSearchParams();
  const checkedCount = checkedItems.filter(Boolean).length;
  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  const checkboxLabels = [
    `اطلعت على كامل التعليمات لتثبيت الشريحة .`,
    `انا على علم انه في حال تم حذف الشريحة او التوقف اثناء تثبيت الشريحة، 
    <span style="font-weight: 600; text-decoration: underline;">فانه لن اتمكن من اعادة تثبيتها</span> مره اخرى.`,
    `اتفهم انني 
    <span style="font-weight: 600; text-decoration: underline;">ولن أقوم</span> بتفعيل خيار “تجوال البيانات” الا عند الوصول للدولة المحددة.`,
  ];
  const lpa = searchParams.get("lpa");
  const matching_id = searchParams.get("matching_id");
  const qrcode = searchParams.get("qrcode");

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
          <div className="col-12 col-lg-5 d-flex flex-column align-items-center text-center">
            <div className="equal-width">
              <Image
                src={Importantwarning}
                alt="Importantwarning"
                className="img-fluid"
              />
            </div>
            <div
              className="equal-width bg-white shadow-sm rounded-3 py-3 px-3 my-3"
              style={{
                border:
                  checkedCount === checkedItems.length
                    ? "1px solid var(--primary-color)" // ✅ أخضر إذا كانت كل الـ Checkboxes محددة
                    : "1px solid #dc3545", // ❌ أحمر إذا كان هناك واحدة غير محددة
                transition: "border 0.3s ease-in-out",
              }}
            >
              {checkedItems.map((isChecked, index) => (
                <div
                  className="compatibility-check d-flex align-items-center"
                  key={index}
                >
                  <label className="custom-checkbox d-flex align-items-center my-1">
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
                  <p
                    className="mb-0 ms-2"
                    style={{
                      textAlign: "start",
                      display: "block",
                      lineHeight: "1.6",
                    }}
                    dangerouslySetInnerHTML={{ __html: checkboxLabels[index] }}
                  ></p>
                </div>
              ))}
            </div>
            <div className="divqr equal-width rounded-3 d-flex justify-content-center  align-items-center p-3 ">
              <p
                className="pqr ms-1"
                style={{
                  textAlign: "start",
                  display: "block",
                  lineHeight: "1.6",
                }}
              >
                امسح رمز QR هذا ضوئياً عن طريق طباعته او عرضه على جهاز اخر، او
                من خلال التقاط صورة للشاشة. و من ثم اتبع التعليمات في الأسفل.
              </p>
              <span className="pqr">
                <QRCodeCanvas
                  value={qrcode}
                  size={165}
                  className="mb-1"
                  style={{
                    filter: checkedItems.every(Boolean) ? "none" : "blur(5px)", // ✅ يزيل الضبابية إذا تم تحديد جميع الـ checkboxes
                    transition: "filter 0.3s ease-in-out", // ✅ تأثير سلس عند التغيير
                  }}
                />
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <li>
              <strong>LPA:</strong> {lpa}
            </li>
            <li>
              <strong>Matching ID:</strong> {matching_id}
            </li>

            {/* يمكن إضافة محتوى إضافي هنا */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(SimcardPage);
