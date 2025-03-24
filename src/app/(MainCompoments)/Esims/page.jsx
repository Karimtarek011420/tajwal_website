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
import { API_V2_BASE_URL } from "@/app/utils/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import numberorder from "@/assets/images/numberorder.svg";
import dataorder from "@/assets/images/dataorder.svg";
import Validity from "@/assets/images/icon3dark.svg";

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
      const { data } = await axios.get(`${API_V2_BASE_URL}/get_my_esims`, {
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
      <div className=" px-lg-4 p-1 container-fluid">
        {loading ? (
          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-sm-1 row-cols-1 gy-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="col">
                <div className="bg-white shadow-sm text-center rounded-3 position-relative p-3">
                  <div className="orders-container mt-3">
                    <div className="order-box">
                      <div className="order-content d-flex justify-content-between align-items-center">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={100} height={20} />
                      </div>
                    </div>
                    <div className="order-box">
                      <div className="order-content d-flex justify-content-between align-items-center">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={100} height={20} />
                      </div>
                    </div>
                  </div>
                  <div className="esimflag position-absolute end-25">
                    <Skeleton width={50} height={40} />
                  </div>
                  <div className="orders-container mt-3">
                    <div className="order-box">
                      <div className="order-content d-flex justify-content-between align-items-center">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={100} height={20} />
                      </div>
                    </div>
                    <div className="order-box">
                      <div className="order-content d-flex justify-content-between align-items-center">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={100} height={20} />
                      </div>
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
            {data?.map((esim) => {
              return (
                <div key={esim.id} className="col">
                  <div className="bg-white shadow-sm text-center rounded-3 position-relative">
                    <Link href={`/Orders/${esim.id}`}>
                      <div className="py-2">
                        <div className=" position-absolute esimflag">
                          <Image
                            src={`https://api.tajwal.co${esim.esims[0].country_data.flag}`}
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
                                  {esim.id}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="order-box">
                            <div className="order-content">
                              <div className="d-flex align-items-center">
                                <Image
                                  src={dataorder}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="me-1 mb-0 ordername">
                                  تاريخ الطلب:
                                </p>
                              </div>
                              <div>
                                <span className=" ordernameid">
                                  {new Date(esim.created_at).toLocaleDateString(
                                    "EG"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="orders-container">
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
                                  عدد الشرائح :
                                </p>
                              </div>
                              <div>
                                <span className=" ordernameid">
                                  {esim?.esims_count}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="order-box">
                            <div className="order-content">
                              <div className="d-flex align-items-center">
                                <Image
                                  src={Validity}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="me-1 mb-0 ordername">المدة:</p>
                              </div>
                              <div>
                                <span className=" ordernameid">
                                  {esim.esims[0].package.day}{" "}
                                  {esim.esims[0].package.day <= 10
                                    ? "أيام"
                                    : "يوم"}
                                </span>
                              </div>
                            </div>
                          </div>
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
