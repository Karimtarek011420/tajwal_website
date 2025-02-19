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

function PreviousOrders() {
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
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/get_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setOrders(data.data);
      setError(null);
    } catch {
      setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
      setTimeout(() => {
        router.push("/");
      }, 500);
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
          {/* Sidebar */}
          <div className="col-md-3 offset-1">
            <div className="cardinfo bg-white shadow-sm rounded-4 ps-5 py-3">
              <div className="px-3">
                <h6>{user?.first_name}</h6>
                <span dir="ltr">{user?.phone_number}</span>
              </div>
              <hr className="my-2" />

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
                    className={pathName === "/Customerservice" ? "active" : ""}
                  >
                    خدمة العملاء
                  </li>
                </Link>
                <Link href="#" onClick={handleLogout}>
                  <li className="accountInformationlogout" aria-label="Logout">
                    تسجيل الخروج
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          {/* Orders Section */}
          <div className="col-md-8">
            <div className="container">
              {loading ? (
                <p className="text-center py-5">جاري تحميل الطلبات...</p>
              ) : error ? (
                <p className="text-danger text-center py-5">{error}</p>
              ) : orders.length === 0 ? (
                <p className="text-center py-5">لا يوجد طلبات سابقة.</p>
              ) : (
                <div className="row gy-4">
                  {orders.map((order) => (
                    <div key={order.id} className="col-md-4">
                      <div className="bg-white shadow-sm text-center p-3 rounded">
                        <Link href="#">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Image
                                src={order.country.image}
                                width={45}
                                height={30}
                                loading="lazy"
                                alt="img-country"
                              />
                              <div className="ms-3 text-start">
                                <p className="text-black mb-0">
                                  رقم الطلب : <span>{order.id}</span>
                                </p>
                                <p className="text-black mb-0">
                                  تاريخ الطلب :{" "}
                                  <span>
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString("EG")}
                                  </span>
                                </p>
                                <p className="text-black mb-0">
                                  إجمالى الطلب :{" "}
                                  <span>{order.invoice_value} ر.س</span>
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(PreviousOrders);
