"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./previousOrders.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { API_BASE_URL } from "@/app/utils/config";
import withAuth from "@/app/utils/withAuth";

function previousOrders() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  const { token, settoken } = useContext(authtoken);
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
      setTimeout(() => {
        router.push("/");
      });
    }
  };

  return (
    <div className="accountInformation position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li className="country-list-links bg-white mx-2 accountInformationp">
            معلومات الحساب
          </li>
        </ul>
      </div>
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-3 offset-1">
            <div className="cardinfo bg-info py-3 bg-white shadow-sm rounded-4 ps-5">
              <div className="px-3">
                <h6>{user?.first_name}</h6>
                <span dir="ltr">{user?.phone_number}</span>
              </div>
              <hr
                style={{ borderColor: "gray", margin: "10px", width: "100%" }}
              />
              <div>
                <ul className="list-unstyled px-3">
                  <Link href="/accountInformation">
                    <li
                      className={
                        pathName === "/accountInformation" ? "active" : ""
                      }
                    >
                      معلومات الحساب
                    </li>
                  </Link>
                  <Link href="/previousOrders">
                    <li
                      className={pathName === "/previousOrders" ? "active" : ""}
                    >
                      الطلبات السابقة
                    </li>
                  </Link>
                  <Link href="/helpCenter">
                    <li className={pathName === "/helpCenter" ? "active" : ""}>
                      مركز المساعدة
                    </li>
                  </Link>
                  <Link href="/Customerservice">
                    <li
                      className={
                        pathName === "/Customerservice" ? "active" : ""
                      }
                    >
                      خدمة العملاء
                    </li>
                  </Link>
                  <Link href={"#"} onClick={handleLogout}>
                    <li
                      className="accountInformationlogout"
                      aria-label="Logout"
                    >
                      تسجيل الخروج
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-md-6 offset-2"></div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(previousOrders);
