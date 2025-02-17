"use client";
import { API_V2_BASE_URL } from "@/app/utils/config";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import "./ordersucess.css";
import ordersucess from "@/assets/images/ordersucess.svg";
import numberorder from "@/assets/images/numberorder.svg";
import price from "@/assets/images/icon4.svg";
import dataorder from "@/assets/images/dataorder.svg";
import paystyle from "@/assets/images/paystyle.svg";
import Coverage from "@/assets/images/Icon1dark.svg";
import Validity from "@/assets/images/icon3dark.svg";
import Numberslides from "@/assets/images/Numberslides.svg";
import PlaybackSpeed from "@/assets/images/PlaybackSpeed.svg";

import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
import Link from "next/link";
function pagesucess({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [data, setData] = useState(null);

  const apiDetialsOrder = async () => {
    try {
      const { data } = await axios.get(
        `${API_V2_BASE_URL}/get_my_esims_details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    apiDetialsOrder();
  }, []);

  return (
    <>
      <div className="ordersucess position-relative py-5">
        <div className="position-absolute country-listbeginall w-100">
          <ul className="list-unstyled d-flex justify-content-center align-items-center">
            <li
              className="country-list-links bg-white mx-lg-2"
              style={{ color: "var(--primary-color)" }}
            >
              <span>تم تأكيد طلبك بنجاح</span>
            </li>
          </ul>
          <div className=" d-flex justify-content-center align-items-center">
            <Image src={ordersucess} width={99} height={99} alt="ordersucess" />
          </div>
        </div>
        <div className="container py-5">
          <div className=" row gy-2 py-5">
            <div className=" col-md-4 offset-2">
              <p className=" ordersucessdetilas px-5 ">تفاصيل الطلب</p>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image
                    src={numberorder}
                    width={13}
                    height={16}
                    alt="iconcountry"
                  />
                  <p className="mx-1 my-0">رقم الطلب</p>
                </div>
                <div>
                  <p className="my-0">6666</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={price} width={7} height={16} alt="price" />
                  <p className="mx-1 my-0">اجمالي الطلب</p>
                </div>
                <div>
                  <p className="my-0"> 99 ر.س</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image
                    src={dataorder}
                    width={16}
                    height={16}
                    alt="dataorder"
                  />
                  <p className="mx-1 my-0">تاريخ الطلب</p>
                </div>
                <div>
                  <p className="my-0">62626772</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={paystyle} width={16} height={11} alt="paystyle" />
                  <p className="mx-1 my-0">وسيلة الدفع</p>
                </div>
                <div>
                  <p className="my-0">62626772</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={Coverage} width={16} height={16} alt="Coverage" />
                  <p className="mx-1 my-0">التغطية</p>
                </div>
                <div>
                  <p className="my-0">62626772</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image
                    src={Numberslides}
                    width={16}
                    height={16}
                    alt="Coverage"
                  />
                  <p className="mx-1 my-0">عدد الشرائح</p>
                </div>
                <div>
                  <p className="my-0">62626772</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={Validity} width={16} height={16} alt="Coverage" />
                  <p className="mx-1 my-0">الصلاحية</p>
                </div>
                <div>
                  <p className="my-0">62626772</p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 offset-2 py-5">
              <div className=" bg-white shadow-sm rounded-2 px-4 py-3">
                <h6 className="wayesim">طريقة تثبيت الشريحة</h6>
                <p className="wayesimp py-1">
                  بأمكانك تثبيت الشريحة بأي من الثلاث طرق المذكور في صفحة “طرق
                  تثبيت الشريحة”
                </p>
                <div className=" p-2 wayslink rounded-3 mx-4">
                  <Link href="">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="country-flag d-flex justify-content-center align-items-center">
                        <Image
                          src={arrow}
                          width={20}
                          height={20}
                          alt="arrow"
                          loading="lazy"
                        />
                        <p className="text-black mb-0 ms-lg-4 px--2 "></p>
                      </div>
                      <i class="fa-solid fa-chevron-left text-white"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuth(pagesucess);
