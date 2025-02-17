"use client";
import { API_V2_BASE_URL } from "@/app/utils/config";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import "./ordersucess.css";
import ordersucess from "@/assets/images/ordersucess.svg";
import Image from "next/image";
export default function page({ params: paramsPromise }) {
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
        </div>
        <div className="container py-5">
          <div>
            <Image src={ordersucess} width={99} height={99} alt="ordersucess" />
          </div>
          <div className=" row gy-2">
            <div className=" col-md-4"></div>
            <div className=" col-md-4 offset-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}
