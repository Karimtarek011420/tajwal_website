"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "./previousOrders.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import arrow from "@/assets/images/arrow.svg";
import axios from "axios";
import withAuth from "@/app/utils/withAuth";
import Image from "next/image";
import { API_BASE_URL } from "@/app/utils/config";
function Previousorders() {
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
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null); // تخزين الخطأ
  const [loading, setLoading] = useState(false);

  const apiOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/get_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log(data.data);
      setdata(data.data); // تعيين البيانات في state
      setError(null);
    } catch (error) {
      setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.");
    }
    setLoading(false);
  };
  useEffect(() => {
    apiOrders();
  }, []);

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
      setTimeout(() => {
        router.push("/");
      });
    }
  };

  return (
    <div className="previousOrders position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li className="country-list-links bg-white mx-2 accountInformationp">
            الطلبات السابقة
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
                  <Link href="/Previousorders">
                    <li
                      className={pathName === "/Previousorders" ? "active" : ""}
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

          <div className=" col-md-8">
            <div className=" container">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <p
                    className="text-dark text-center py-5"
                    style={{ minHeight: "30vh" }}
                  >
                    جارى تحميل الطلبات......
                  </p>
                </div>
              ) : error ? (
                <div className="d-flex justify-content-center">
                  <p
                    className="text-danger text-center py-5"
                    style={{ minHeight: "30vh" }}
                  >
                    {error}
                  </p>
                </div>
              ) : data?.length === 0 ? (
                <div className="d-flex justify-content-center">
                  <p
                    className="text-danger text-center py-5"
                    style={{ minHeight: "30vh" }}
                  >
                    لا يوجد طلبات سابقة.
                  </p>
                </div>
              ) : (
                <div className=" row gy-4">
                  {data?.map((order) => {
                    return (
                      <div key={order.id} className="col-md-4">
                        <div className="bg-white shadow-sm text-center">
                          <Link href={`/previousOrders/${order.id}`}>
                            <div className="d-flex justify-content-between align-items-center p-3">
                              <div className="country-flag d-flex justify-content-center align-items-center">
                                <Image
                                  src={order.country.image}
                                  width={45}
                                  height={30}
                                  loading="lazy"
                                  alt="img-country"
                                />
                                <div>
                                  <p className="text-black mb-0  ordername me-3">
                                    رقم الطلب :
                                    <span className="me-1"> {order.id}</span>
                                  </p>
                                  <p className="text-black mb-0  ordername me-3">
                                    تاريخ الطلب :
                                    <span className="me-1">
                                      {new Date(
                                        order.created_at
                                      ).toLocaleDateString("EG")}
                                    </span>
                                  </p>
                                  <p className="text-black mb-0  ordername me-3">
                                    إجمالى الطلب :
                                    <span className="me-1">
                                      {order.invoice_value} ر.س
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <Image
                                src={arrow}
                                width={8}
                                height={15}
                                alt="arrow"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Previousorders);
