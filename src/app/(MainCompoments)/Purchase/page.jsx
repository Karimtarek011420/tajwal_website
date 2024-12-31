"use client";
import React, { useCallback, useMemo, useState } from "react";
import "./purchase.css";
import { usePackage } from "@/app/_Compontents/PackageContext/PackageContext";
import icon1 from "@/assets/images/Icon1dark.svg";
import icon2 from "@/assets/images/Icon2.svg";
import icon3 from "@/assets/images/icon3dark.svg";
import icon4 from "@/assets/images/icon4.svg";
import icon5 from "@/assets/images/icon5dark.svg";
import mada from "@/assets/images/Mada.svg";
import Visa from "@/assets/images/Visa.svg";
import Tabby from "@/assets/images/Tabby.svg";
import Tamara from "@/assets/images/Tamara.svg";
import Tabby2 from "@/assets/images/Tabby2.svg";
import Tamara3 from "@/assets/images/Tamara3.svg";
import Apple from "@/assets/images/ApplePay.svg";
import google from "@/assets/images/google.svg";
import Image from "next/image";

export default function page() {
  const { selectedPackage } = usePackage();
  const [quantity, setQuantity] = useState(1); // عداد الشرائح
  const incrementQuantity = useCallback(() => setQuantity((q) => q + 1), []);
  const decrementQuantity = useCallback(
    () => setQuantity((q) => (q > 1 ? q - 1 : q)),
    []
  );
  const totalPrice = useMemo(
    () => (selectedPackage?.price * quantity).toFixed(2),
    [selectedPackage, quantity]
  );

  if (!selectedPackage) {
    return (
      <div className=" d-flex justify-content-center align-items-center py-5 selectedPackagereturn ">
        <p>
          لم يتم اختيار أي باقة. الرجاء العودة إلى الصفحة السابقة واختيار باقة.
        </p>
      </div>
    );
  }
  console.log(selectedPackage)

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
                    {selectedPackage.operator.countries.map((country) => {
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
                        {selectedPackage.operator.coverages
                          .map((coverage) => coverage.name)
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
                        {selectedPackage.operator.rechargeability === true
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
                  <p className="purchasepachage purchasepachagewidth px-5 py-1 my-1 w-100">
                    الخصم : <span className="me-5">kkk</span>
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <p className="purchasepachage purchasepachagewidth px-5 py-1 my-1 boldall w-100">
                    الإجمالى الكلى :<span className="me-4">kkk</span>
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
                    type="text"
                    className="discount-input"
                    placeholder="ادخل كود الخصم"
                  />
                  <button className="apply-btn">تطبيق</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="bg-white shadow-lg rounded-2  pb-1 pt-1 px-4 mb-1  ">
                <div className="compatibility-check">
                  <h5 className="title">تأكيد التحقق من توافق هاتفك</h5>
                  <div className="form-check d-flex align-items-center pt-1">
                    <input
                      className="form-check-input custom-checkbox"
                      type="checkbox"
                      id="compatibilityCheckbox"
                    />
                    <p>
                      أوافق انني اطلعت على{" "}
                      <span style={{ color: "#336279", fontWeight: "600" }}>
                        قائمة الهواتف المتوافقة
                      </span>
                      ، وتأكدت من توافق هاتفي.
                    </p>
                  </div>
                </div>
              </div>
              <div className=" bg-white shadow-lg rounded-2 pb-2 pt-2 px-2 ">
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
                <div className="container">
                  <div className="row mb-3 justify-content-center">
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={mada} width={125} height={34} alt="visa" />
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={Visa} width={125} height={34} alt="visa" />
                    </div>
                  </div>
                  <div className="row mb-3 justify-content-center">
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={Tabby} width={125} height={34} alt="visa" />
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={Tamara} width={125} height={34} alt="visa" />
                    </div>
                  </div>
                  <div className="row mb-4 justify-content-center">
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={Tabby2} width={125} height={34} alt="visa" />
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <Image src={Tamara3} width={125} height={34} alt="visa" />
                    </div>
                  </div>
                  <div>
                    <div className="my-2 d-flex justify-content-center align-items-center">
                      <Image
                        src={Apple}
                        alt="pay"
                        className="img-fluid"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="my-2 d-flex justify-content-center align-items-center">
                      <Image
                        src={google}
                        alt="pay"
                        className="img-fluid"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
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
