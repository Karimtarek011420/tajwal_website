import React from "react";
import "./ContactUS.css";
import xcontectus from "@/assets/images/xcontectus.svg";
import instacontect from "@/assets/images/instacontect.svg";
import emailcontect from "@/assets/images/emailcontect.svg";
import phonecontect from "@/assets/images/phonecontect.svg";
import watscontect from "@/assets/images/watscontect.svg";
import Image from "next/image";

export default function ContactUS() {
  return (
    <div className="ContactUS position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span>اتصل بنا</span>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <div className=" row gy-4">
          <div className=" col-md-3">
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp">
              <p className=" px-3 ">تابعنا</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="https://x.com/Tajwalapp?t=fNlENfiyMV5Qf4d2CPeLDA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 text-uppercase"
                  >
                    tajwalco@
                  </a>
                  <Image
                    src={xcontectus}
                    width={30}
                    height={30}
                    alt="xcontectus"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="https://x.com/Tajwalapp?t=fNlENfiyMV5Qf4d2CPeLDA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 text-uppercase"
                  >
                    tajwalco@
                  </a>
                  <Image
                    src={instacontect}
                    width={30}
                    height={30}
                    alt="instacontect"
                  />
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp  mt-5">
              <p className=" px-3 ">خدمة العملاء</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="tel:+966505105224"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5"
                    dir="ltr"
                  >
                    966 505 10 5224
                  </a>
                  <Image
                    src={phonecontect}
                    width={30}
                    height={30}
                    alt="phonecontect"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
          <div className=" col-md-6">
            <div className=" bg-white shadow-sm">
              

            </div>
          </div>
          <div className=" col-md-3">
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp">
              <p className=" px-3 "> الإدارة المالية</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
            <div
              className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp"
              style={{ marginTop: "100px" }}
            >
              <p className=" px-3 ">الإدارة العامة</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
                  className=" d-flex   justify-content-end   align-items-center w-75 "
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
  );
}
