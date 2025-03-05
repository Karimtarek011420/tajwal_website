"use client";
import React, { useEffect, useState } from "react";
import "./Knowladgecenter.css";
import Image from "next/image";
import Helpcentertwal from "@/assets/images/footerHero.svg";
import Isolation_Mode from "@/assets/images/Isolation_Mode.svg";
import eorrhelp from "@/assets/images/eorrhelp.svg";
import servicechat from "@/assets/images/servicechat.svg";
import servicewhats from "@/assets/images/servicewhats.svg";
import Link from "next/link";

export default function KnowladgecenterPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
    <div className="Knowladgecenter position-relative py-5">
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
        {openFaqIndex !== null ? (
          <>
            <div className="me-lg-5 d-flex Knowladgecentermediea">
              <Link href={"/Helpcenter"}>
                <p className="me-lg-5 Helpcenterpquestion ">مركز المساعدة</p>
              </Link>
              <p
                className=" Helpcenterpquestion mx-1"
                onClick={() => setOpenFaqIndex(null)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="fa-solid fa-chevron-left mx-1 mt-2 "
                  style={{ fontSize: "14px", color: "var(--auth-color)" }}
                ></i>
                كيف تستخدم تجوال
              </p>
              <p className=" Helpcenterpquestiontwal mx-1">
                <i
                  className="fa-solid fa-chevron-left mx-1 mt-2 "
                  style={{ fontSize: "14px", color: "var(--auth-color)" }}
                ></i>{" "}
                لوريم ايبسوم هو ببساطة
              </p>
            </div>
            <div className="bg-white shadow-sm rounded-3 py-4  px-lg-5 px-3  mx-lg-5">
              <p className=" Helpcenterpquestion2">
                لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس
                المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم
                ولايزال المعيار للنص الشكلي.
              </p>
              <div className=" px-lg-5 px-3 Helpcenterpquestion3">
                أعلنت الهيئة السعودية للسياحة عن إطلاق تقويم فعاليات شتاء
                السعودية ليشمل الفعاليات والمواسم المزمع إقامتها في 7 وجهات، هي:
                "الرياض وجدة والعلا والبحر الأحمر والمنطقة الشرقية والمدينة
                المنورة وحائل"، بداية من شهر أكتوبر 2024 وحتى نهاية الربع الأول
                من 2025. ويأتي إطلاق تقويم فعاليات شتاء السعودية ضمن برنامج شتاء
                السعودية والذي يتضمن أكثر من 1000 تجربة وفعالية سياحية حول
                المملكة، وما يزيد عن 500 عرض مميز، كما يتضمن التقويم عدداً من
                المواسم والفعاليات المميزة مثل: موسم الرياض وموسم الدرعية وموسم
                العلا وموسم المدينة المنورة وتقويم جدة، بالإضافة إلى رالي داكار
                ومدل بيست وكروز السعودية وبينالي الفنون الإسلامية، بالإضافة إلى
                تفعيل مسارات الهايكنج والمخيمات والكرفانات في المناطق الشتوية.
                وبإمكان السياح والزوار الراغبين في مزيد من المعلومات عن برنامج
                شتاء السعودية هذا العام؛ زيارة منصة "روح السعودية" والاطلاع على
                العديد من العروض والباقات والخصومات الخاصة، وتتضمن المرحلة
                الأولى أكثر من 50 عرضاً بالتعاون مع الشركاء من القطاع الخاص.
                وكان معالي وزير السياحة، رئيس مجلس إدارة الهيئة السعودية
                للسياحة، الأستاذ أحمد بن عقيل الخطيب قد أعلن مؤخراً عن إطلاق
                برنامج شتاء السعودية خلال ورشة عمل جمعت منظومة السياحة السعودية
                بالعديد من الشركاء؛ ناقشوا من خلالها أهم المنجزات والمستهدفات
                والتحديات. وبهذه المناسبة صرح معالي وزير السياحة، رئيس مجلس
                إدارة الهيئة السعودية للسياحة، الأستاذ أحمد بن عقيل الخطيب
                قائلاً: "بدعم غير مسبوق من القيادة الرشيدة لقطاع السياحة، ومع
                تكامل جهود منظومة السياحة وشركائها من القطاع الخاص، نطلق تقويم
                فعاليات الشتاء لهذا العام ضمن برنامج شتاء السعودية، وهو ما يرفع
                سقف طموحاتنا وتطلعاتنا لتحقيق منجزات قياسية جديدة تعكس العمل
                الدؤوب لمنظومة السياحة والحملات المستمرة لاستهداف الأسواق
                المحلية والدولية ومن المتوقع أن تؤتي هذه الجهود ثمارها في جذب
                عدد أكبر من السياح، مع العمل على الارتقاء بكل ما نقدمه لهم
                ليستمتعوا بجمال الطبيعة الخلابة والتنوع المناخي الفريد الذي يميز
                أجواء المملكة في هذا الوقت". وبهذه المناسبة صرح معالي وزير
                السياحة، رئيس مجلس إدارة الهيئة السعودية للسياحة، الأستاذ أحمد
                بن عقيل الخطيب قائلاً: "بدعم غير مسبوق من القيادة الرشيدة لقطاع
                السياحة، ومع تكامل جهود منظومة السياحة وشركائها من القطاع الخاص،
                نطلق تقويم فعاليات الشتاء لهذا العام ضمن برنامج شتاء السعودية،
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="me-lg-5 d-flex">
              <Link href={"/Helpcenter"}>
                <p className="me-lg-5 Helpcenterpquestion ">مركز المساعدة</p>
              </Link>
              <i
                className="fa-solid fa-chevron-left mx-1 mt-2 "
                style={{ fontSize: "14px", color: "var(--auth-color)" }}
              ></i>
              <p className=" Helpcenterpquestiontwal mx-1">كيف تستخدم تجوال</p>
            </div>
            <div className="bg-white shadow-sm rounded-3 py-4  px-lg-5 px-3  mx-lg-5">
              <p className=" Helpcenterpquestion2">كيف تستخدم تجوال</p>
              <div className="row px-lg-5 px-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="col-md-12 mb-4">
                    <li
                      className="list-group-item border-0 d-flex align-items-start text-end"
                      onClick={() => setOpenFaqIndex(openFaqIndex === null)}
                      style={{ cursor: "pointer" }}
                    >
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
          </>
        )}
        <div className=" row gy-3 pt-5 pb-4 justify-content-center align-items-center px-lg-5">
          <div className="col-md-4">
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
        <div className=" text-center">
          <p className="Helpcenterphelp">لا زلت تحتاج مساعدة؟</p>
          <p className="Helpcenterphelp1 pt-2">
            تواصل معنا باستخدام اي من وسائل التواصل التالية و سنسعد بالرد عليكم.
          </p>
          <div className="mt-4">
            <div className="row justify-content-center align-items-center  gy-4 ">
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
      </div>
    </div>
  );
}
