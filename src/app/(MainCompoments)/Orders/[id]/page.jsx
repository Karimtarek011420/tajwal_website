"use client";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Orderdetilas.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import axios from "axios";
import withAuth from "@/app/utils/withAuth";
import Image from "next/image";
import { API_BASE_URL, API_V2_BASE_URL } from "@/app/utils/config";
import numberorder from "@/assets/images/numberorder.svg";
import price from "@/assets/images/icon4.svg";
import dataorder from "@/assets/images/dataorder.svg";
import paystyle from "@/assets/images/paystyle.svg";
import Coverage from "@/assets/images/Icon1dark.svg";
import Validity from "@/assets/images/icon3dark.svg";
import Numberslides from "@/assets/images/Numberslides.svg";
import PlaybackSpeed from "@/assets/images/wayesim.svg";
import invoiceways from "@/assets/images/myfatoraorder.svg";
import dataid from "@/assets/images/Icon2.svg";
import iccid from "@/assets/images/iccid.svg";
import esimstatus from "@/assets/images/esimstatus.svg";
import appStore1 from "@/assets/images/appStore1.svg";
import googlePlay2 from "@/assets/images/googlePlay2.svg";
import { QRCodeCanvas } from "qrcode.react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

function Ordersdetails() {
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);
  const { token, settoken } = useContext(authtoken);
  const params = useParams();
  const id = params.id; // استقبال ID الطلب من الـ URL
  const router = useRouter();
  const pathName = usePathname();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiDetialsOrder = useCallback(async () => {
    if (!id || !token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_V2_BASE_URL}/get_my_esims_details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);
  useEffect(() => {
    apiDetialsOrder();
  }, [apiDetialsOrder]);
  const handleLogout = async () => {
    if (!token) return;
    await logoutApi(token, settoken);
    router.push("/");
  };

  const handleback = () => {
    router.push("/Orders");
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ بنجاح!", {
      duration: 1500,
      style: { backgroundColor: "#4b87a4", color: "white" },
    });
  };
  const appLink =
    "https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1";
  const appLinkApple =
    "https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315";
  return (
    <div className="Ordersdetails position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-2 accountInformationp"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-4"> طلب رقم {id}</span>
          </li>
        </ul>
      </div>
      <div className="container py-2">
        <button
          onClick={handleback}
          className="  px-4 py-2  rounded-3 me-lg-5 me-2 mb-3 btnback"
        >
          <div className=" d-flex justify-content-center align-items-center text-center">
            <i className="fa-solid fa-arrow-right text-white"></i>
            <p className=" p-2 mb-0  text-white   "> العودة للطلبات</p>
          </div>
        </button>
        <div className="row gy-3">
          <div className="col-md-4">
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
                  <Link href="/Orders">
                    <li
                      className={pathName === `/Orders/${id}` ? "active" : ""}
                    >
                      الطلبات السابقة
                    </li>
                  </Link>
                  <Link href="/Helpcenter">
                    <li className={pathName === "/Helpcenter" ? "active" : ""}>
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
                  <li
                    className="accountInformationlogout"
                    aria-label="Logout"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    تسجيل الخروج
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {loading ? (
              <div className=" row gy-2">
                <div className=" col-xl-6">
                  <div className="bg-white shadow-sm d-flex justify-content-center align-items-center  rounded-3">
                    <div className="p-3">
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" col-xl-6">
                  <div className="bg-white shadow-sm d-flex justify-content-center align-items-center   rounded-3">
                    <div className=" p-3">
                      <div>
                        <Skeleton width={300} height={70} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-sm d-flex justify-content-center align-items-center mt-2   rounded-3">
                    <div className=" p-3">
                      <div>
                        <Skeleton width={300} height={70} />
                      </div>
                      <div>
                        <Skeleton width={300} height={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" row gy-2">
                <div className=" col-xl-6">
                  <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 mx-2  bg-white shadow-sm ordersucessdetilas">
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
                      <Image
                        src={paystyle}
                        width={16}
                        height={11}
                        alt="paystyle"
                      />
                      <p className="mx-1 my-0">وسيلة الدفع</p>
                    </div>
                    <div>
                      <p className="my-0">{data?.payment_method}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center p-3 rounded-3 m-2 mt-3 bg-white shadow-sm ordersucessdetilas">
                    <div className="d-flex align-items-center justify-content-center ">
                      <Image
                        src={Coverage}
                        width={16}
                        height={16}
                        alt="Coverage"
                      />
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
                        src={dataid}
                        width={16}
                        height={16}
                        alt="Coverage"
                      />
                      <p className="mx-1 my-0">البيانات</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {data?.esims[0].package_amount === -1
                          ? "لا محدود"
                          : `${Math.floor(
                              data?.esims[0].package_amount / 1000
                            )}غيغا بايت`}
                      </p>
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
                      <Image
                        src={Validity}
                        width={16}
                        height={16}
                        alt="Coverage"
                      />
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
                  <div className="p-2 wayslink rounded-3 shadow-sm m-2 mt-4">
                    <Link
                      href={`${API_BASE_URL}/invoice_view/${id}`}
                      target="_blank"
                      className="d-flex justify-content-between align-items-center w-100"
                    >
                      <p className="p-1 mb-0 text-white wayslinkppin text-center flex-grow-1">
                        الفاتورة
                      </p>
                      <div className=" ms-2">
                        <Image
                          src={invoiceways}
                          width={21}
                          height={22}
                          alt="arrow"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="  col-xl-6">
                  {data?.esims?.map((esim, index) => (
                    <div
                      key={esim.id}
                      className=" bg-white shadow-sm rounded-3 px-2 py-4  mb-2"
                    >
                      <div className=" px-3">
                        <h6 className="wayesim">
                          طريقة تثبيت الشريحة {index + 1}
                        </h6>
                        <p className="wayesimp py-1">
                          بأمكانك تثبيت الشريحة بأي من الثلاث طرق المذكور في
                          صفحة “طرق تثبيت الشريحة”
                        </p>
                      </div>
                      <div
                        className="d-flex justify-content-between align-items-center text-center px-3 py-2 rounded-3 mx-lg-3 mx-2 mb-3   shadow-sm ordersucessdetilas"
                        style={{ backgroundColor: "#F1F3F666" }}
                      >
                        <div className="d-flex align-items-center justify-content-center ">
                          <Image
                            src={iccid}
                            width={16}
                            height={16}
                            alt="iconcountry"
                          />
                          <p className="mx-1 my-0">رقم ICCID</p>
                        </div>

                        <div className=" d-flex justify-content-center align-items-center text-center">
                          <p className="my-0">
                            {esim?.esim_installation_data?.iccid}
                          </p>
                          <button
                            onClick={() =>
                              handleCopy(esim?.esim_installation_data?.iccid)
                            }
                            className="btn  me-2"
                            title="نسخ"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between align-items-center text-center px-3 py-3 rounded-3 mx-lg-3 mx-2 mb-3   shadow-sm ordersucessdetilas"
                        style={{ backgroundColor: "#F1F3F666" }}
                      >
                        <div className="d-flex align-items-center justify-content-center ">
                          <Image
                            src={esimstatus}
                            width={16}
                            height={16}
                            alt="iconcountry"
                          />
                          <p className="mx-1 my-0"> حالة الشريحة</p>
                        </div>
                        {esim?.esim_installation_data?.isInstalled ? (
                          <p className="my-0">
                            مثبتة{" "}
                            <i className="fa-solid fa-check  text-success fa-xl"></i>
                          </p>
                        ) : (
                          <p className="my-0">
                            غير مثبتة{" "}
                            <i className="fa-solid fa-xmark fa-xl  text-danger"></i>
                          </p>
                        )}
                      </div>
                      <div className=" py-2 px-4 wayslink rounded-3 mx-lg-3  mx-2">
                        {console.log(data.esims)}
                        <Link
                          href={{
                            pathname: "/Simcard",
                            query: {
                              lpa: esim?.esim_installation_data?.lpa,
                              matching_id:
                                esim?.esim_installation_data?.matching_id,
                              qrcode: esim?.esim_installation_data?.qrcode,
                            },
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center ">
                            <div className=" d-flex justify-content-center align-items-center p-1">
                              <Image
                                src={PlaybackSpeed}
                                width={18}
                                height={18}
                                alt="arrow"
                                loading="lazy"
                              />
                              <p className="text-black mb-0 ms-lg-3 px-2 text-white  wayslinkp">
                                طرق تثبيت الشريحة
                              </p>
                            </div>
                            <i className="fa-solid fa-chevron-left text-white p-1"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}

                  <div className=" mt-5">
                    <div className="   d-flex flex-column align-items-center text-center">
                      <h6 className="tajwalh  text-center pb-2">حمل التطبيق</h6>
                      <div className="d-flex align-content-center align-items-center  text-center ">
                        <div className="d-flex flex-column align-items-center">
                          <QRCodeCanvas
                            value={appLink}
                            size={60}
                            className="mb-1"
                          />
                          <a
                            href="https://play.google.com/store/apps/details?id=com.sic.tajwaal&pli=1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={googlePlay2}
                              width={100}
                              height={30}
                              alt="Google Play"
                            />
                          </a>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                          <QRCodeCanvas
                            value={appLinkApple}
                            size={60}
                            className="mb-1"
                          />
                          <a
                            href="https://apps.apple.com/sa/app/%D8%AA%D8%AC%D9%88%D8%A7%D9%84-%D8%B4%D8%B1%D8%A7%D8%A6%D8%AD-%D8%A8%D9%8A%D8%A7%D9%86%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id6553994315"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={appStore1}
                              width={100}
                              height={30}
                              alt="App Store"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Ordersdetails);
