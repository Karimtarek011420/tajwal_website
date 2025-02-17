"use client";
import { API_V2_BASE_URL } from "@/app/utils/config";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

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
      console.log(data)
      setData(data); // تأكد من وجود البيانات
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    apiDetialsOrder();
  }, []);

  return (
    <>
      <div>Page {id}</div>
    </>
  );
}
