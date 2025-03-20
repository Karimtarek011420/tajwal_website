"use client";
import React, { useState } from "react";
import "./Simcard.css";
import Importantwarning from "@/assets/images/Importantwarning.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
function SimcardPage() {
  const [selectedOption, setSelectedOption] = useState("qr");
  // const [selectedWatch, setSelectedWatch] = useState("video");
  const [selectedWatch, setSelectedWatch] = useState("info");
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
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ بنجاح!", {
      duration: 1500,
      style: { backgroundColor: "#4b87a4", color: "white" },
    });
  };

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
        <div className="row gy-3">
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
                  className="compatibility-checkesim d-flex align-items-center"
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
            {selectedOption === "qr" ? (
              <div className="divqr equal-width rounded-3 d-flex justify-content-center  align-items-center p-3  ">
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
                      filter: checkedItems.every(Boolean)
                        ? "none"
                        : "blur(5px)", // ✅ يزيل الضبابية إذا تم تحديد جميع الـ checkboxes
                      transition: "filter 0.3s ease-in-out", // ✅ تأثير سلس عند التغيير
                    }}
                  />
                </span>
              </div>
            ) : (
              <div className="divqr equal-width rounded-3 p-3   checkmanul ">
                <p className=" text-end m-1 checkmanul ">عنوان SM-DP+</p>
                <div
                  className=" d-flex justify-content-between align-items-center text-center bg-white rounded-3 px-2 py-1 checkmanul"
                  style={{
                    filter: checkedItems.every(Boolean) ? "none" : "blur(5px)", // تفعيل الضبابية إذا لم تكن جميع الـ checkboxes محددة
                    pointerEvents: checkedItems.every(Boolean)
                      ? "auto"
                      : "none", // تعطيل النسخ والتفاعل بالماوس إذا لم تكن جميع الـ checkboxes محددة
                    userSelect: checkedItems.every(Boolean) ? "text" : "none", // منع تحديد النص عند عدم تحديد جميع الـ checkboxes
                    transition: "filter 0.3s ease-in-out", // تأثير سلس عند التغيير
                  }}
                >
                  <p className="my-0 pe-2">{lpa}</p>
                  <button
                    onClick={() => handleCopy(lpa)}
                    className="btn  "
                    title="نسخ"
                    disabled={!checkedItems.every(Boolean)}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <p className=" text-end m-1 checkmanul mt-2 ">رمز التنشيط</p>
                <div
                  className=" d-flex justify-content-between align-items-center text-center bg-white rounded-3 px-2 py-1 checkmanul"
                  style={{
                    filter: checkedItems.every(Boolean) ? "none" : "blur(5px)", // تفعيل الضبابية إذا لم تكن جميع الـ checkboxes محددة
                    pointerEvents: checkedItems.every(Boolean)
                      ? "auto"
                      : "none", // تعطيل النسخ والتفاعل بالماوس إذا لم تكن جميع الـ checkboxes محددة
                    userSelect: checkedItems.every(Boolean) ? "text" : "none", // منع تحديد النص عند عدم تحديد جميع الـ checkboxes
                    transition: "filter 0.3s ease-in-out", // تأثير سلس عند التغيير
                  }}
                >
                  <p className="my-0 pe-2">{matching_id}</p>
                  <button
                    onClick={() => handleCopy(matching_id)}
                    className="btn  "
                    title="نسخ"
                    disabled={!checkedItems.every(Boolean)}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <p
                  className="checkmanul p-2 "
                  style={{
                    textAlign: "start",
                    display: "block",
                    lineHeight: "1.6",
                  }}
                >
                  يرجى نسخ هذي البيانات و من ثم اتباع التعليمات في الاسفل لتثبيت
                  الشريحة يدوياً على جهازك.
                </p>
                <button className="checkmanulbtn px-5  py-2  rounded-2 shadow-sm  text-white border-0  w-75">
                  مشاركة التعليمات
                </button>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-7 d-flex flex-column align-items-center text-center ">
            <div className=" d-flex">
              <button
                className={` px-5  py-2  rounded-2 shadow-sm  text-white border-0  ms-2 ${
                  selectedWatch === "video" ? "checkwatchbtn" : "checkinfobtn"
                }`}
                onClick={() => setSelectedWatch("video")}
              >
                مشاهدة الفيديو
              </button>
              <button
                className={`  px-5  py-2  rounded-2 shadow-sm  text-white border-0  ms-2  ${
                  selectedWatch === "info" ? "checkwatchbtn" : "checkinfobtn"
                }`}
                onClick={() => setSelectedWatch("info")}
              >
                قراءة التعليمات
              </button>
            </div>
            {selectedWatch === "video" ? (
              <div>
                <p className="py-5 checkmanul text-black">
                  الرجاء الإطلاع على الفيديو كاملاً لتفادي اي اخطاء قد تؤثر على
                  تثبيت الشريحة بالشكل الصحيح.
                </p>
                <div>
                  <video width="100%" height="auto" controls>
                    <source src="/video.mp4" type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                </div>
              </div>
            ) : selectedOption === "qr" ? (
              <div className="my-5">
                <p className="instructionsqr px-lg-5 ">
                  يجب عدم ايقاف او مقاطعة عملية تثبيت الشريحة اثناء اجراءات
                  تثبيت الشريحة. كما انه يجب التأكد من اتصال الهاتف بالانترنت
                  طوال خطوات عملية تثبيت الشريحة.
                </p>
                <div className="instructionsqrstep text-end mt-5">
                  <span>الخطوة الأولى:</span>
                  <ol className="mt-2 pe-3 list-decimal list-inside leading-relaxed">
                    <li>
                      انتقل إلى الاعدادات &gt; البيانات الخلوية &gt; اضافة خطة أو
                      اعداد الخدمة الخلوية &gt; استخدم رمز QR على جهازك.
                    </li>
                    <li>
                      ضع الشريحة الجديدة في المكان المخصص لها وانتظر حتى يتعرف
                      عليها الهاتف.
                    </li>
                    <li>
                      اتبع التعليمات الظاهرة على الشاشة لإكمال التثبيت بنجاح.
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              <div>information شمم</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(SimcardPage);
