"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./purchase.css";
import { usePackage } from "@/app/_Compontents/PackageContext/PackageContext";
import icon1 from "@/assets/images/Icon1dark.svg";
import icon2 from "@/assets/images/Icon2.svg";
import icon3 from "@/assets/images/icon3dark.svg";
import icon4 from "@/assets/images/icon4.svg";
import icon5 from "@/assets/images/icon5dark.svg";
import Express from "@/assets/images/Mada.svg";
import Visa from "@/assets/images/Visa.svg";
import Tabby from "@/assets/images/Tabby.svg";
import Tamara from "@/assets/images/Tamara.svg";
import Tabby2 from "@/assets/images/Tabby2.svg";
import Tamara3 from "@/assets/images/Tamara3.svg";
import Apple from "@/assets/images/ApplePay.svg";
import google from "@/assets/images/google.svg";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

export default function page() {
  const { selectedPackage, setSelectedPackagepur } = usePackage();
  const [quantity, setQuantity] = useState(1); // عداد الشرائح
  const [discountData, setDiscountData] = useState(null); // لتخزين بيانات الخصم
  const [couponCode, setCouponCode] = useState(""); // كود الخصم
  const [loading, setloading] = useState(false); //  الخصم

  const incrementQuantity = useCallback(() => setQuantity((q) => q + 1), []);
  const decrementQuantity = useCallback(
    () => setQuantity((q) => (q > 1 ? q - 1 : q)),
    []
  );
  const totalPrice = useMemo(
    () => (selectedPackage?.price * quantity).toFixed(2),
    [selectedPackage, quantity]
  );
  const totalPriceAll = useMemo(
    () => (discountData ? discountData.new_price : totalPrice),
    [discountData, totalPrice]
  );

  const fetchDiscount = async () => {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/coupon_check",
        {
          quantity,
          package_id: selectedPackage.id,
          code: couponCode,
          country: selectedPackage.operator.countries
            .map((country) => country.country_code)
            .join(", "),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      if (data.status === true) {
        setDiscountData(data.data);
        toast.success("تم تطبيق الخصم بنجاح!", {
          duration: 1500,
          style: { backgroundColor: "#4b87a4", color: "white" },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("   كود الخصم غير صالح!", {
        duration: 1500,
        style: { backgroundColor: "#4b87a4", color: "white" },
      });
    }
    setloading(false);
  };
  const paymentMethods = [
    {
      id: 6,
      name: "express",
      icon: Express,
      paymentWay: "myfatoorah",
    },
    {
      id: 2,
      name: "visa",
      icon: Visa,
      paymentWay: "myfatoorah",
    },
    {
      id: 12,
      name: "stcpay",
      icon: Tabby, // Local image
      paymentWay: "myfatoorah",
    },
    {
      id: 3,
      name: "Tamara",
      icon: Tamara, // Local image
      paymentWay: "myfatoorah",
    },
    {
      id: 5,
      name: "tabby",
      icon: Tabby2, // Local image
      paymentWay: "tabby",
    },
    {
      id: 22,
      name: "Tamara3",
      icon: Tamara3, // Local image
      paymentWay: "tamara",
    },
    {
      id: 11,
      name: "Apple",
      icon: Apple, // Local image
      paymentWay: "myfatoorah",
    },
    {
      id: 16,
      name: "goolge",
      icon: google, // Local image
      paymentWay: "myfatoorah",
    },
  ];

  const handlePayment = async (methodId, paymentWay) => {
    try {
      const { data } = await axios.post(
        "https://api.tajwal.co/api/v1/submitOrder",
        {
          paymentMethodId: methodId,
          quantity,
          package_id: selectedPackage.id,
          type: selectedPackage.type,
          country: selectedPackage.operator.countries
            .map((country) => country.country_code)
            .join(", "),
          paymentWay,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      if (data.status === true) {
        window.open(data.data.invoiceURL, "_self");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedPackage) {
    return (
      <div className=" d-flex justify-content-center align-items-center py-5 selectedPackagereturn ">
        <p>
          لم يتم اختيار أي باقة. الرجاء العودة إلى الصفحة السابقة واختيار باقة.
        </p>
      </div>
    );
  }
  localStorage.setItem("package", JSON.stringify(selectedPackage));

  console.log(selectedPackage);

  return (
    <>
      <div className="Purchasedateils position-relative py-5">
        <div className="position-absolute country-list w-100">
          <ul className="list-unstyled d-flex justify-content-center align-items-center">
            <li
              className="country-list-linkslist bg-white mx-lg-2"
              style={{ color: "#336279" }}
            >
              <span>إتمام الطلب</span>
            </li>
          </ul>
        </div>
        <div className=" container py-5">
          <div className=" row gy-3">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="cardpurchase  bg-white shadow-lg rounded-2 position-relative">
                <div className=" countydtailsup d-flex justify-content-around align-items-center position-absolute ">
                  <div>
                    {selectedPackage.operator?.countries?.map((country) => {
                      return (
                        <Image
                          key={country.country_code}
                          src={country.image}
                          height={58}
                          width={80}
                          alt={country.title}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <span
                      style={{
                        backgroundColor:
                          selectedPackage.amount === -1 ? "#F9F9F9" : "#D9DEE4",
                        fontSize: "13px",
                        fontWeight: "300",
                      }}
                      dir="ltr"
                      className=" px-4 py-2 rounded-2"
                    >
                      {selectedPackage.amount === -1
                        ? "لا محدود"
                        : `${selectedPackage.amount / 1000}GB`}
                    </span>
                  </div>
                </div>
                <div className="py-5">
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon1}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0">التغطية</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator?.coverages
                          ?.map((coverage) => coverage.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#fff",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon2}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">البيانات</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.amount === -1
                          ? "لا محدود"
                          : `${selectedPackage.amount / 1000} غيغا بايت`}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",

                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon3}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0">الصلاحية</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.day}{" "}
                        {selectedPackage.day <= 10 ? "أيام" : "يوم"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#fff",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon4}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className="text-white"
                      />
                      <p className="mx-2 my-0">السعر</p>
                    </div>
                    <div>
                      <p className="my-0">{selectedPackage.price} ر.س</p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                    style={{
                      backgroundColor: "#F1F3F666",
                      color: "#626E7B",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon5}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0">قابلة للتجديد</p>
                    </div>
                    <div>
                      <p className="my-0">
                        {selectedPackage.operator?.rechargeability === true
                          ? "نعم"
                          : "لا"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="bg-white shadow-lg rounded-2 mb-3 pb-5 pt-4 px-2">
                <p className=" px-1   purchasepachagesum">المجموع</p>
                <div className=" d-flex purchasepachage justify-content-between align-items-center my-1 px-2 py-2 ">
                  <p className="my-0 ">
                    شريحة -
                    {selectedPackage.operator.coverages
                      .map((coverage) => coverage.name)
                      .join(", ")}
                  </p>
                  <div>
                    <button onClick={incrementQuantity} className="btn">
                      +
                    </button>
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: "600",
                        backgroundColor: "#fff",
                        padding: "6px 10px",
                      }}
                    >
                      {quantity}
                    </span>
                    <button onClick={decrementQuantity} className="btn">
                      -
                    </button>
                  </div>
                  <p className="my-0"> {selectedPackage.price} ر.س</p>
                </div>
                <div className="d-flex justify-content-end">
                  <p className="purchasepachage purchasepachagewidth px-4 py-1 my-2 w-100">
                    المجموع : <span className="me-5">{totalPrice} ر.س</span>
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  {discountData ? (
                    <p className="purchasepachage purchasepachagewidth px-5 py-1 my-1 w-100">
                      الخصم :{" "}
                      <span className="me-5">
                        {(totalPrice * discountData.percentage) / 100} ر.س
                      </span>
                    </p>
                  ) : (
                    <p className="purchasepachage purchasepachagewidth px-5 py-1 my-1 w-100">
                      الخصم : <span className="me-5"></span>
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-end">
                  <p className="purchasepachage purchasepachagewidth px-3 py-1 my-1 boldall w-100">
                    الإجمالى الكلى :
                    <span className="me-4">{totalPriceAll} ر.س</span>
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-2 py-4 px-4">
                <p className="p1 disacount">كود الخصم</p>
                <p className="p1 disacount">
                  لديك كود خصم؟ ادخلها في الخانة التالية واضغط تطبيق
                </p>
                <div className="discount-container">
                  <input
                    id="couponCode"
                    name="couponCode"
                    type="text"
                    className="discount-input"
                    placeholder="ادخل كود الخصم"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    onClick={fetchDiscount}
                    className="apply-btn d-flex justify-content-center align-items-center"
                    disabled={!couponCode || loading}
                  >
                    {loading ? (
                      <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                      />
                    ) : (
                      "تطبيق"
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="bg-white shadow-lg rounded-2  pb-3 pt-1 px-4 mb-2  ">
                <div className="compatibility-check">
                  <h5 className="title">تأكيد التحقق من توافق هاتفك</h5>
                  <label className="custom-checkbox pt-lg-1 d-flex justify-content-center align-items-center">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <p>
                      أوافق انني اطلعت على{" "}
                      <span style={{ color: "#336279", fontWeight: "600" }}>
                        قائمة الهواتف المتوافقة
                      </span>
                      ، وتأكدت من توافق هاتفي.
                    </p>
                  </label>
                </div>
              </div>
              <div className=" bg-white shadow-lg rounded-2 pb-4 pt-2 px-2 ">
                <p
                  className="px-1 "
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#626E7B",
                  }}
                >
                  وسيلة الدفع
                </p>
                <div className="container py-1">
                  <div className="row justify-content-center gy-2">
                    {paymentMethods?.map((method, index) => {
                      const isLastTwo = index >= paymentMethods.length - 2; // تحقق إذا كانت الصورة من الصور الأخيرة
                      return (
                        <div
                          key={method.id}
                          className={`${
                            isLastTwo
                              ? "col-12"
                              : "col-lg-6 col-md-6 col-sm-6 col-12"
                          }`}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            className="d-flex justify-content-center align-items-center payement"
                            onClick={() => handlePayment(method.id,method.paymentWay)}
                          >
                            <Image
                              src={method.icon}
                              width={isLastTwo ? 300 : 150} // الصور الأخيرة بحجم أكبر
                              height={35}
                              alt={method.name}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
