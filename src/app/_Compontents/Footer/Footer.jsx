"use client";
import Image from "next/image";
import Link from "next/link";
import Footerlogo from "@/assets/images/footerHero.svg";
import appStore1 from "@/assets/images/appStore1.svg";
import googlePlay2 from "@/assets/images/googlePlay2.svg";
import { QRCodeCanvas } from "qrcode.react";

const Footer = () => {
  const appLink =
    "https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1";
  const appLinkApple =
    "https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315";

  return (
    <footer>
      <div className="footer">
        <div className=" px-3 py-3">
          <div className=" row gy-4">
            <div className=" col-md-3  offset-2">
              <div className=" d-flex">
                <Image
                  src={Footerlogo}
                  width={75}
                  height={75}
                  alt="Tajwal Logo"
                  className="me-4"
                />
                <div className="mx-xl-3 mx-2">
                  <h6 className="tajwalh">شركة تجوال العالم للتجارة</h6>
                  <p className="tajwalp">
                    هي أول شركة سعودية مسجلة متخصصة في <br /> بيع شرائح التجوال
                    الالكترونية في السعودية،
                    <br /> و مرخصة بالسجل التجاري رقم 7041398541
                  </p>
                  <div className=" d-flex mx-5">
                    <a
                      href="https://x.com/Tajwalapp?t=fNlENfiyMV5Qf4d2CPeLDA&s=09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-square-x-twitter fs-5"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/tajwalapp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-square-instagram mx-2 fs-5"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-3 offset-2 d-flex flex-column align-items-center text-center">
              <h6 className="tajwalh  text-center pb-2">حمل التطبيق</h6>
              <div className="d-flex align-content-center align-items-center  text-center ">
                <div className="d-flex flex-column align-items-center">
                  <QRCodeCanvas value={appLink} size={60} className="mb-1" />
                  <a
                    href="https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={googlePlay2}
                      width={100}
                      height={30}
                      alt="Google Play"
                    />
                  </a>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <QRCodeCanvas
                    value={appLinkApple}
                    size={60}
                    className="mb-1"
                  />
                  <a
                    href="https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={appStore1}
                      width={100}
                      height={30}
                      alt="App Store"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h6 className="tajwalh text-center py-2">خريطة الموقع</h6>
              <ul
                className="row row-cols-2 g-2 text-center list-unstyled tajwalp "
                style={{ fontWeight: 400 }}
              >
                <li className="col">
                  <Link href="/Login">دخول</Link>
                </li>
                <li className="col">
                  <Link href="/">البداية</Link>
                </li>
                <li className="col">
                  <Link href="/Register">تسجيل</Link>
                </li>
                <li className="col">
                  <Link href="/Countries">الدول</Link>
                </li>
                <li className="col">
                  <Link href="/Customerservice">خدمة العملاء</Link>
                </li>
                <li className="col">
                  <Link href="/Offers">العروض</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="allfooter d-flex flex-column flex-md-row justify-content-between align-items-center px-3 px-md-5 py-3 text-white">
        <p className="tajwalall text-center mb-2 mb-md-0">
          جميع الحقوق محفوظة لـ <span>تجوال</span>
        </p>
        <div className="d-flex flex-column flex-md-row align-items-center">
          <p className="tajwalall text-center mb-2 mb-md-0 mx-md-3">
            <span>سياسة الخصوصية</span>
          </p>
          <p className="tajwalall text-center mb-0 mx-md-3">
            {" "}
            <span>سياسة الاستخدام</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
