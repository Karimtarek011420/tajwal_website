"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "./esims.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import arrow from "@/assets/images/arrow.svg";
import axios from "axios";
import withAuth from "@/app/utils/withAuth";
import Image from "next/image";
import { API_BASE_URL } from "@/app/utils/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import numberorder from "@/assets/images/numberorder.svg";
function PreviousEsims() {
  const { token } = useContext(authtoken);
  const router = useRouter();
  const pathName = usePathname();
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null); // تخزين الخطأ
  const [loading, setLoading] = useState(false);
  const apiEsims = async () => {
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
    apiEsims();
  }, []);

  return (
    <div className="PreviousEsims position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-2 accountInformationp"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-4">شرائحى</span>
          </li>
        </ul>
      </div>
      <div className=" px-lg-4 p-3 container-fluid">
        {loading ? (
          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-sm-1 row-cols-1 gy-4">
            {Array.from({ length: 50 }).map((_, index) => (
              <div key={index} className="col">
                <div className="bg-white shadow-sm text-center">
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <div className=" d-flex justify-content-center align-items-center">
                      <Skeleton width={60} height={40} />
                      <Skeleton width={80} className="me-1 ms-lg-4 px-lg-3" />
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center">
            <p className="text-danger text-center py-5">{error}</p>
          </div>
        ) : data?.length === 0 ? (
          <div className="d-flex justify-content-center">
            <p className=" text-danger fs-6 text-center py-5">
              لا يوجد شؤائح سابقة.
            </p>
          </div>
        ) : (
          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-sm-1 row-cols-1 gy-4">
            {data?.map((order) => {
              return (
                <div key={order.id} className="col">
                  <div className="bg-white shadow-sm text-center rounded-3 position-relative">
                    <Link href={`/Orders/${order.id}`}>
                      <div className="py-3 px-2">
                        <div className=" position-absolute esimflag  end-25">
                          <Image
                            src={order.country.image}
                            width={50}
                            height={40}
                            loading="lazy"
                            alt="img-country"
                          />
                        </div>
                        <div className="orders-container mt-3">
                          <div className="order-box">
                            <div className="order-content">
                              <div className="d-flex align-items-center">
                                <Image
                                  src={numberorder}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="me-1 mb-0 ordername">
                                  رقم الطلب :
                                </p>
                              </div>
                              <div>
                                <span className="me-3 ordernameid">
                                  {order.id}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="order-box">
                            <div className="order-content">
                              <div className="d-flex align-items-center">
                                <Image
                                  src={numberorder}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="me-1 mb-0 ordername">
                                  رقم الطلب :
                                </p>
                              </div>
                              <div>
                                <span className="me-3 ordernameid">
                                  {order.id}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-column align-items-start  text-start mt-3">
                          <p className="mb-0 ordername d-flex">
                            رقم الطلب:
                            <span className="me-3 flex-grow-1 text-start">
                              {order.id}
                            </span>
                          </p>
                          <p className="mb-0 ordername d-flex">
                            تاريخ الطلب:
                            <span className="me-2 flex-grow-1 text-start">
                              {new Date(order.created_at).toLocaleDateString(
                                "EG"
                              )}
                            </span>
                          </p>
                          <p className="mb-0 ordername d-flex">
                            إجمالي الطلب:
                            <span className="me-2 flex-grow-1 text-start">
                              {order.invoice_value} ر.س
                            </span>
                          </p>
                        </div>
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
  );
}

export default withAuth(PreviousEsims);
