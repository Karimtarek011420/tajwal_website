"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logonavbar from "@/assets/images/logonavbar.png";
import { authtoken } from "../Authtoken/Authtoken";
import "./navbar.css";
import { logoutApi } from "@/app/Hookshelp/logout";
// مكون خاص برابط Dropdown
const DropdownItem = ({ href, text, onClick, customColor, isLast }) => (
  <li>
    <button
      className="dropdown-item d-flex justify-content-between align-items-center px-3  border-0"
      onClick={() => onClick(href)}
      style={{
        color: customColor || "var(--secondary-color)",
        padding: "10px",
        fontSize: "12px",
        fontWeight: "300",
        width: "100%",
        background: "none",
        border: "none",
        textAlign: "start",
      }}
    >
      <span className="ps-5">{text}</span>
      <i className="fa-solid fa-chevron-left pe-lg-5 pe-md-1"></i>
    </button>

    {/* إخفاء الخط إذا كان العنصر الأخير */}
    {!isLast && (
      <hr style={{ borderColor: "gray", margin: 0, width: "100%" }} />
    )}
  </li>
);

export default function Navbar() {
  const pathName = usePathname();
  const { token, settoken } = useContext(authtoken);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // تحميل Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      window.bootstrap = bootstrap;
    });
  }, []);
  // استرجاع بيانات المستخدم من LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = async () => {
    // إغلاق القائمة المنسدلة إذا كانت مفتوحة
    const dropdown = document.querySelector(".dropdown-menu.show");
    if (dropdown && window.bootstrap) {
      const bsDropdown = window.bootstrap.Dropdown.getInstance(dropdown);
      if (bsDropdown) {
        bsDropdown.hide();
      }
    }
    // إغلاق الـ Offcanvas إذا كان مفتوحًا
    const offcanvas = document.getElementById("offcanvasNavbar");
    if (offcanvas && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }

    // تنفيذ تسجيل الخروج
    if (token) {
      await logoutApi(token, settoken); // انتظر تسجيل الخروج قبل التوجيه
    }

    // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
    router.push("/");
  };
  useEffect(() => {
    // عند تغيير المسار، تأكد من إغلاق الـ Offcanvas
    const offcanvas = document.getElementById("offcanvasNavbar");
    if (offcanvas && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }, [pathName]);
  const handleNavClick = (href) => {
    router.push(href); // توجيه المستخدم إلى الرابط الجديد
  };

  // روابط المستخدم المسجل
  const renderAuthLinks = () =>
    token ? (
      <li className="nav-item dropdown dropacount offnecmedia ms-xl-5">
        <button
          className="nav-link dropdown-toggle d-flex align-items-center justify-content-between"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ color: "white", background: "none", border: "none" }}
        >
          <div className="d-flex align-items-center mx-2">
            <i className="fa-solid fa-user text-white iconoffcen"></i>
            <span
              className="mx-2 iconoffcenspan"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              {user?.first_name}
            </span>
          </div>
        </button>
        <ul className="dropdown-menu py-2">
          <DropdownItem
            href="/accountInformation"
            text="معلومات الحساب"
            onClick={handleNavClick}
          />
          <DropdownItem
            href="/Orders"
            text="الطلبات السابقة"
            onClick={handleNavClick}
          />
          <DropdownItem
            text="تسجيل الخروج"
            customColor="#E14F72"
            onClick={handleLogout}
            isLast={true}
          />
        </ul>
      </li>
    ) : (
      <>
        <li className="nav-item offnecmedia">
          <Link className="nav-link text-white" href="/Login">
            دخول
          </Link>
        </li>
        <li className="nav-item btnresgister">
          <Link
            className="nav-link text-white resgister my-1 mx-xl-5 me-xl-4 me-2"
            href="/Register"
          >
            تسجيل
          </Link>
        </li>
      </>
    );

  return (
    <nav className="navbar navbar-expand-lg py-1">
      <div className="container-fluid">
        <Link className="navbar-brand px-xl-5" href="/">
          <Image
            className="logo"
            src={logonavbar}
            width={200}
            height={100}
            alt="Company logo"
            priority
          />
        </Link>
        <button
          className="navbar-toggler toggler-mobile"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header d-flex ">
            <button
              type="button"
              className="btn-close text-black  d-lg-none fs-6  border border-1 border-black "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body ">
            <ul className="navbar-nav mx-auto  mb-lg-0">
              <li className="nav-item">
                <button
                  className={`nav-link text-white ${
                    pathName === "/" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/")}
                  href="/"
                >
                  البداية
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white ${
                    pathName === "/Countries" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/Countries")}
                >
                  الدول
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white ${
                    pathName === "/Offers" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/Offers")}
                >
                  العروض
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => handleNavClick("/Helpcenter")}
                >
                  مركز المساعدة
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white ${
                    pathName === "/ContactUS" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/ContactUS")}
                >
                  اتصل بنا
                </button>
              </li>
              {/* <li className="nav-item">
                <button
                  className="nav-link text-white"
                  aria-label="Switch to English"
                >
                  English
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  aria-label="Switch currency to SAR"
                >
                  ر.س
                </button>
              </li> */}
            </ul>
            <ul className="navbar-nav  mb-2  mb-lg-0">{renderAuthLinks()}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
