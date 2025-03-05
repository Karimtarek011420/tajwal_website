"use client";
import React, { useEffect, useState } from "react";
import "./Helpcenter.css";
import Image from "next/image";
import Helpcentertwal from "@/assets/images/footerHero.svg";
import Isolation_Mode from "@/assets/images/Isolation_Mode.svg";
import eorrhelp from "@/assets/images/eorrhelp.svg";
import servicechat from "@/assets/images/servicechat.svg";
import servicewhats from "@/assets/images/servicewhats.svg";
import emailcontect from "@/assets/images/emailcontect.svg";
import phonecontect from "@/assets/images/phonecontect.svg";
import watscontect from "@/assets/images/watscontect.svg";
import Link from "next/link";

export default function HelpcenterPage() {
  const faqs = Array(8).fill(
    "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)، ويستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي."
  );
  const handleClick = () => {
    if (!document.getElementById("ze-snippet")) {
      const script = document.createElement("script");
      script.id = "ze-snippet";
      script.src =
        "https://static.zdassets.com/ekr/snippet.js?key=f4e36963-4fc1-4a3c-9fca-282829bb25e1";
      script.async = true;
      script.onload = () => console.log("Zendesk script loaded!");
      document.body.appendChild(script);
    }
  };

  return (
    <div className="Helpcenter position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5">مركز المساعدة</span>
          </li>
        </ul>
      </div>
      <div className=" container pb-5 pt-3">
        <p className=" text-center Helpcenterp ">مالذي تحتاج المساعدة فيه؟</p>
        <div className=" search-bar">
          <button className="search-button" aria-label="Search">
            <i className="fas fa-search"></i>
          </button>
          <input type="text" placeholder="اكتب نبذة عن المشكلة التي تواجهها" />
          <p className="Helpcenterpsearch">ابحث</p>
        </div>
        <div className=" row gy-3 py-5 justify-content-center align-items-center px-lg-5">
          <div className="col-md-4">
            <Link href={"/Knowladgecenter"}>
              <div className=" bg-white shadow-sm rounded-3  text-center px-lg-5 px-2 py-3">
                <Image
                  src={Helpcentertwal}
                  alt="Helpcentertajwal"
                  width={26}
                  height={35}
                />
                <p className="Helpcentertajwalp pt-2">كيف تستخدم تجوال</p>
                <p className="Helpcentertajwalp2 pt-2">
                  خطوات التسجيل و اختيار الباقة و اتمام عملية الدفع و طرق الوصول
                  للشرائح و الطلبات السابقة
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <div className=" bg-white shadow-sm rounded-3  text-center px-lg-5 px-2 py-3">
              <Image
                src={Isolation_Mode}
                alt="Isolation_Mode"
                width={33}
                height={35}
              />
              <p className="Helpcentertajwalp pt-2">
                تفعيل الشرائح و استخدامها
              </p>
              <p className="Helpcentertajwalp2 pt-2">
                تعرف على كيفية تثبيت الشريحة و اضافتها الى هاتفك و تفعيلها و
                البدء في استخدامها.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" bg-white shadow-sm rounded-3  text-center px-lg-5 px-2 py-3">
              <Image src={eorrhelp} alt="eorrhelp" width={21} height={35} />
              <p className="Helpcentertajwalp pt-2">
                الأعطال الشائعه و اصلاحها
              </p>
              <p className="Helpcentertajwalp2 pt-2">
                قد تواجهك بعض المشاكل في اي من مراحل تفعيل او استخدام الشريحة،
                هنا تجد الحلول.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="me-lg-5 Helpcenterpquestion ">الاسئلة الأكثر شيوعاً</p>
          <div className="   bg-white shadow-sm rounded-3 py-4  px-lg-4 px-3 mx-lg-5">
            <div className="row">
              {faqs.map((faq, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <li className="list-group-item border-0 d-flex align-items-start text-end">
                    <i
                      className="fa-solid fa-circle m-2 "
                      style={{ fontSize: "9px", color: "var(--auth-color)" }}
                    ></i>
                    <span className="Helpcenterpspan">{faq}</span>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" text-center py-5">
          <p className="Helpcenterphelp">لا زلت تحتاج مساعدة؟</p>
          <p className="Helpcenterphelp1 pt-2">
            تواصل معنا باستخدام اي من وسائل التواصل التالية و سنسعد بالرد عليكم.
          </p>
          <div className="  mt-4">
            <div className="row justify-content-center align-items-center gy-4 ">
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white shadow-sm rounded-2 py-2 ContactUSph text-center">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex  justify-content-center align-items-center w-100  px-3 rounded">
                      <Image
                        src={servicechat}
                        width={51}
                        height={50}
                        alt="xcontectus"
                      />
                      <a
                        href="#"
                        target="_self"
                        rel="noopener noreferrer"
                        className=" px-lg-4 px-1"
                      >
                        المحادثة المباشرة
                      </a>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-sm-6 col-md-4 col-lg-3">
                <div className="bg-white shadow-sm rounded-2 py-2 ContactUSph text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex  justify-content-center align-items-center w-100  px-3 rounded">
                      <Image
                        src={servicewhats}
                        width={40}
                        height={50}
                        alt="xcontectus"
                      />
                      <a
                        href="https://wa.me/966505105224"
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" px-lg-4 px-2"
                      >
                        محادثة واتساب
                      </a>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-center align-items-center  mt-2 ">
          <div className="row  justify-content-center gy-4 w-100 mediatab">
            <div className=" col-md-4">
              <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp  ">
                <p className=" px-3 ">خدمة العملاء</p>
                <div className="  d-flex justify-content-center align-items-center">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50 widthsercive "
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="mailto:help@tajwal.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5 "
                    >
                      help@tajwal.co
                    </a>
                    <Image
                      src={emailcontect}
                      width={30}
                      height={30}
                      alt="emailcontect"
                    />
                  </div>
                </div>

                <div className="  d-flex justify-content-center align-items-center mt-3">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50 widthsercive "
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="https://wa.me/966505105224"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5"
                      dir="ltr"
                    >
                      966 505 10 5224
                    </a>
                    <Image
                      src={watscontect}
                      width={30}
                      height={30}
                      alt="watscontect"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-4">
              <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp ">
                <p className=" px-3 "> الإدارة المالية</p>
                <div className="  d-flex justify-content-center align-items-center">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50 widthsercive "
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="mailto:finance@tajwal.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5 "
                    >
                      finance@tajwal.co
                    </a>
                    <Image
                      src={emailcontect}
                      width={30}
                      height={30}
                      alt="emailcontect"
                    />
                  </div>
                </div>
                <div className="  d-flex justify-content-center align-items-center mt-3">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50 widthsercive "
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="tel:+966505123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5"
                      dir="ltr"
                    >
                      966 505 12 3456
                    </a>
                    <Image
                      src={phonecontect}
                      width={30}
                      height={30}
                      alt="phonecontect"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-4">
              <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp ">
                <p className=" px-3 ">الإدارة العامة</p>
                <div className="  d-flex justify-content-center align-items-center">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50  widthsercive"
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="mailto:info@tajwal.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5 "
                    >
                      info@tajwal.co
                    </a>
                    <Image
                      src={emailcontect}
                      width={30}
                      height={30}
                      alt="emailcontect"
                    />
                  </div>
                </div>
                <div className="  d-flex justify-content-center align-items-center mt-3">
                  <div
                    className=" d-flex   justify-content-end   align-items-center w-50  widthsercive"
                    style={{ backgroundColor: "#F1F3F6" }}
                  >
                    <a
                      href="tel:+966505123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-5"
                      dir="ltr"
                    >
                      966 505 12 3456{" "}
                    </a>
                    <Image
                      src={phonecontect}
                      width={30}
                      height={30}
                      alt="phonecontect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
