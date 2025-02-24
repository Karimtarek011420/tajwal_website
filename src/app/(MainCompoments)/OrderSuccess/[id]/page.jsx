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
import invoiceways from "@/assets/images/invoiceways.svg";
import TravelBag from "@/assets/images/TravelBag.svg";
import appstoreqr from "@/assets/images/appstoreqr.svg";
import googleplayqr from "@/assets/images/googleplayqr.svg";
import appStore1 from "@/assets/images/appStore1.svg";
import googlePlay2 from "@/assets/images/googlePlay2.svg";
import Image from "next/image";
import withAuth from "@/app/utils/withAuth";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
function pagesucess({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiDetialsOrder = async () => {
    setLoading(true);
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
      setData(data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    apiDetialsOrder();
  }, []);
  if (loading) {
    return (
      <p className="text-center py-5" style={{ minHeight: "30vh" }}>
        جارٍ تحميل البيانات...
      </p>
    );
  }
  const appLink =
    "https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1";
  const appLinkApple =
    "https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315";

  return (
    <>
      <div className="ordersucess position-relative py-5">
        <div className="position-absolute country-listbeginall w-100">
          <ul className="list-unstyled d-flex justify-content-center align-items-center">
            <li
              className="country-list-links  mx-lg-2"
              style={{ color: "var(--primary-color)" , backgroundColor:'var(--background)' }}
            >
              <span className="p-4">تم تأكيد طلبك بنجاح</span>
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
                  <p className="my-0">{data?.id}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={price} width={7} height={16} alt="price" />
                  <p className="mx-1 my-0">اجمالي الطلب</p>
                </div>
                <div>
                  <p className="my-0">{data?.invoice_value} ر.س</p>
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
                  <p className="my-0">
                    {new Date(data?.created_at).toLocaleDateString("EG")}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={paystyle} width={16} height={11} alt="paystyle" />
                  <p className="mx-1 my-0">وسيلة الدفع</p>
                </div>
                <div>
                  <p className="my-0">{data?.payment_method}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={Coverage} width={16} height={16} alt="Coverage" />
                  <p className="mx-1 my-0">التغطية</p>
                </div>
                <div>
                  {data?.esims?.[0] && (
                    <p className="my-0">{data.esims[0].country_name}</p>
                  )}
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
                  <p className="my-0">{data?.esims_count}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                <div className="d-flex align-items-center justify-content-center ">
                  <Image src={Validity} width={16} height={16} alt="Coverage" />
                  <p className="mx-1 my-0">الصلاحية</p>
                </div>
                <div>
                  {data?.esims?.[0] && (
                    <p className="my-0">
                      {data.esims[0].package_day}{" "}
                      {data.esims[0].package_day <= 10 ? "أيام" : "يوم"}
                    </p>
                  )}
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
                <div className=" p-2 wayslink rounded-3 mx-5">
                  <Link href="">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="country-flag d-flex justify-content-center align-items-center p-1">
                        <Image
                          src={PlaybackSpeed}
                          width={16}
                          height={16}
                          alt="arrow"
                          loading="lazy"
                        />
                        <p className="text-black mb-0 ms-lg-4 px-3 text-white  wayslinkp">
                          {" "}
                          طرق تثبيت الشريحة
                        </p>
                      </div>
                      <i className="fa-solid fa-chevron-left text-white p-1"></i>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" d-flex mt-5  ">
                <div className=" px-5 py-2 wayslink rounded-3 ms-3  w-50 ">
                  <Link href="">
                    <div className="">
                      <div className=" d-flex justify-content-center align-items-center text-center">
                        <Image
                          src={invoiceways}
                          width={16}
                          height={16}
                          alt="arrow"
                          loading="lazy"
                          className="m-1"
                        />
                        <p className=" p-1 mb-0  text-white  wayslinkp">
                          {" "}
                          الفاتورة
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className=" px-5 py-2 wayslink rounded-3 ms-3  w-50 ">
                  <Link href="">
                    <div className="">
                      <div className=" d-flex justify-content-center align-items-center text-center">
                        <Image
                          src={TravelBag}
                          width={16}
                          height={16}
                          alt="arrow"
                          loading="lazy"
                          className="m-1"
                        />
                        <p className=" p-1 mb-0  text-white  wayslinkp">
                          {" "}
                          الشريحة
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" mt-5">
                <h6 className="tajwalh text-center py-2">حمل التطبيق</h6>
                <div className=" d-flex justify-content-center align-items-center   ">
                  <div className=" mx-2">
                    <QRCodeCanvas value={appLink} size={60} />
                  </div>
                  <div className=" mx-3">
                    <QRCodeCanvas value={appLinkApple} size={60} />
                  </div>
                </div>
                <div className="  d-flex justify-content-center align-items-center">
                  <a
                    className="mx-2"
                    href="https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={googlePlay2}
                      width={75}
                      height={25}
                      alt="Google Play"
                    />
                  </a>

                  <a
                    className=" mx-1"
                    href="https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={appStore1}
                      width={75}
                      height={25}
                      alt="App Store"
                    />
                  </a>
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
