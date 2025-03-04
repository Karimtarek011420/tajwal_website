"use client";
import React, { useEffect, useState } from "react";
import "./Helpcenter.css";
import Image from "next/image";
import Helpcentertwal from "@/assets/images/footerHero.svg";
import Isolation_Mode from "@/assets/images/Isolation_Mode.svg";
import eorrhelp from "@/assets/images/eorrhelp.svg";

export default function HelpcenterPage() {
  const faqs = Array(8).fill(
    "لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)، ويستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي."
  );
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
        <p className=" text-center Helpcenterp ">
          مالذي تحتاج المساعدة فيه؟
        </p>
        <div className=" search-bar">
          <button className="search-button" aria-label="Search">
            <i className="fas fa-search"></i>
          </button>
          <input type="text" placeholder="اكتب نبذة عن المشكلة التي تواجهها" />
          <p className="Helpcenterpsearch">ابحث</p>
        </div>
        <div className=" row gy-3 py-5 justify-content-center align-items-center px-lg-5">
          <div className="col-md-4">
            <div className=" bg-white shadow-sm rounded-3  text-center px-5 py-3">
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
          </div>
          <div className="col-md-4">
            <div className=" bg-white shadow-sm rounded-3  text-center px-5 py-3">
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
            <div className=" bg-white shadow-sm rounded-3  text-center px-5 py-3">
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
        <div></div>
      </div>
    </div>
  );
}
