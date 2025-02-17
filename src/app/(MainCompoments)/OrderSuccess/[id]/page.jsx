"use client";
import { API_V2_BASE_URL } from "@/app/utils/config";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import "./ordersucess.css";
import ordersucess from "@/assets/images/ordersucess.svg";
import numberorder from "@/assets/images/numberorder.svg";
import price from "@/assets/images/icon4.svg";

import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
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
      console.log(data);
      setData(data);
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
            <div className=" col-md-4">
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
                  <Image
                    src={price}
                    width={13}
                    height={16}
                    alt="price"
                  />
                  <p className="mx-1 my-0">اجمالي الطلب</p>
                </div>
                <div>
                  <p className="my-0"> 99 ر.س</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image
                    src={price}
                    width={13}
                    height={16}
                    alt="price"
                  />
                  <p className="mx-1 my-0">اجمالي الطلب</p>
                </div>
                <div>
                  <p className="my-0"> 99 ر.س</p>
                </div>
              </div>
            </div>
            <div className=" col-md-4 offset-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuth(pagesucess)
