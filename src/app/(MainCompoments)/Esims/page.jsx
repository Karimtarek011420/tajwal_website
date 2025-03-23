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
function PreviousEsims() {
  const { token } = useContext(authtoken);
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

  return (
    <div className="previousOrders position-relative py-5">
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
      <div className=" px-5 py-3 container-fluid">
        {loading ? (
          <div  className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            {Array.from({ length: 50 }).map((_, index) => (
              <div key={index} className="col">
                <div className="bg-white shadow-sm text-center">
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="country-flag d-flex justify-content-center align-items-center">
                      <Skeleton width={60} height={40} />
                      <Skeleton width={80} className="me-1 ms-lg-4 px-lg-3" />
                    </div>
                    <Skeleton width={20} height={20} />
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
              لا يوجد طلبات سابقة.
            </p>
          </div>
        ) : (
          <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            {data?.map((order) => {
              return (
                <div key={order.id} className="col">
                  <div className="bg-white shadow-sm text-center rounded-3">
                    <Link href={`/Orders/${order.id}`}>
                      <div className="d-flex justify-content-between align-items-center p-3">
                        <div className=" d-flex justify-content-center align-items-center">
                          <Image
                            src={order.country.image}
                            width={45}
                            height={30}
                            loading="lazy"
                            alt="img-country"
                          />
                          <div className="d-flex flex-column align-items-start me-3 text-start">
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
                        <Image src={arrow} width={8} height={15} alt="arrow" />
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
