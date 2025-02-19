"use client";
import React, { useState } from "react";
import "./ContactUS.css";
import xcontectus from "@/assets/images/xcontectus.svg";
import instacontect from "@/assets/images/instacontect.svg";
import emailcontect from "@/assets/images/emailcontect.svg";
import phonecontect from "@/assets/images/phonecontect.svg";
import watscontect from "@/assets/images/watscontect.svg";
import ordersucess from "@/assets/images/ordersucess.svg";
import Image from "next/image";
import { API_V2_BASE_URL } from "@/app/utils/config";
import { useFormik } from "formik";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
export default function ContactUS() {
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setsucessMessage] = useState(false);
  
  const [loading, setloading] = useState(false);
  const apiContect = async (values) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        `${API_V2_BASE_URL}/support_email/contact_us`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(data);
      if (data.success === true) {
        setsucessMessage(true);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  const handleForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: "",
    },
    onSubmit: apiContect,
    validate: (values) => {
      let errors = {};
      const regexName = /^[\u0600-\u06FFa-zA-Z\s]{2,}$/;
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const PHONE_REGEX = /\+\d{11,15}/;

      if (!regexName.test(values.name)) {
        errors.name = "الرجاء إدخال الاسم بشكل صحيح";
      }
      if (!values.subject || values.subject.trim() === "") {
        errors.subject = "الرجاء إدخال سبب التواصل";
      }
      if (!regexEmail.test(values.email)) {
        errors.email = "الرجاء إدخال البريد الإلكتروني بشكل صحيح";
      }
      if (!PHONE_REGEX.test(values.phone)) {
        errors.phone = "الرجاء إدخال رقم الجوال بشكل صحيح";
      }
      if (!values.message || values.message.trim() === "") {
        errors.message = "الرجاء إدخال محتوى الرسالة";
      } else if (values.message.length < 10) {
        errors.message = "يجب أن تحتوي الرسالة على 10 أحرف على الأقل";
      }

      return errors;
    },
  });

  const handlePhoneNumberChange = (value) => {
    handleForm.setFieldValue("phone", value);
  };

  return (
    <div className="ContactUS position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="p-5">اتصل بنا</span>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <div className=" row gy-4">
          <div className=" col-md-3">
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp">
              <p className=" px-3 ">تابعنا</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="https://x.com/Tajwalapp?t=fNlENfiyMV5Qf4d2CPeLDA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 text-uppercase"
                  >
                    tajwalco@
                  </a>
                  <Image
                    src={xcontectus}
                    width={30}
                    height={30}
                    alt="xcontectus"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="https://x.com/Tajwalapp?t=fNlENfiyMV5Qf4d2CPeLDA&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 text-uppercase"
                  >
                    tajwalco@
                  </a>
                  <Image
                    src={instacontect}
                    width={30}
                    height={30}
                    alt="instacontect"
                  />
                </div>
              </div>
            </div>
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp  mt-5">
              <p className=" px-3 ">خدمة العملاء</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="mailto:help@tajwal.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 "
                  >
                    help@tajwal.co
                  </a>
                  <Image
                    src={emailcontect}
                    width={30}
                    height={30}
                    alt="emailcontect"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="tel:+966505105224"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5"
                    dir="ltr"
                  >
                    966 505 10 5224
                  </a>
                  <Image
                    src={phonecontect}
                    width={30}
                    height={30}
                    alt="phonecontect"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="https://wa.me/966505105224"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5"
                    dir="ltr"
                  >
                    966 505 10 5224
                  </a>
                  <Image
                    src={watscontect}
                    width={30}
                    height={30}
                    alt="watscontect"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-md-6">
            <div className=" bg-white shadow-sm py-1">
              {sucessMessage ? (
                <div className=" py-5 ">
                  <div className=" d-flex justify-content-center  align-items-center">
                    <Image
                      src={ordersucess}
                      alt="ordersucess"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="d-flex justify-content-center  align-items-center pb-5 pt-2 sucessp">
                    <p>تم ارسال رسالتك</p>
                  </div>
                  <div className="d-flex justify-content-center  align-items-center pb-5 sucesspline">
                    <p className="pb-3">سنقوم بالرد عليكم في أقرب وقت ممكن.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForm.handleSubmit}>
                  <div className=" row gy-3 px-3">
                    <div className=" col-md-6">
                      <div className="mb-4 mt-1">
                        <input
                          type="text"
                          value={handleForm.values.name}
                          onChange={handleForm.handleChange}
                          onBlur={handleForm.handleBlur}
                          className="form-control"
                          id="name"
                          placeholder="الاسم"
                          aria-label="name"
                        />
                        {handleForm.errors.name && handleForm.touched.name ? (
                          <div
                            className="alert alert-danger my-2"
                            role="alert"
                            style={{ fontSize: "12px" }}
                          >
                            {handleForm.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4 mt-1">
                        <select
                          value={handleForm.values.subject}
                          onChange={handleForm.handleChange}
                          onBlur={handleForm.handleBlur}
                          id="subject"
                          className="form-control ContactUSp shadow-none  h-25 "
                        >
                          <option value="" disabled>
                            سبب التواصل
                          </option>
                          <option value="subject1">الموضوع 1</option>
                          <option value="subject2">الموضوع 2</option>
                          <option value="subject3">الموضوع 3</option>
                        </select>
                      </div>
                      {handleForm.errors.subject &&
                      handleForm.touched.subject ? (
                        <div
                          className="alert alert-danger my-2"
                          role="alert"
                          style={{ fontSize: "12px" }}
                        >
                          {handleForm.errors.subject}
                        </div>
                      ) : null}
                    </div>

                    <div className=" col-md-6">
                      <div className="mb-4">
                        <input
                          value={handleForm.values.email}
                          onChange={handleForm.handleChange}
                          onBlur={handleForm.handleBlur}
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="البريد الإلكتروني"
                          aria-label="Email"
                          required
                        />
                        {handleForm.errors.email && handleForm.touched.email ? (
                          <div
                            className="alert alert-danger my-2"
                            role="alert"
                            style={{ fontSize: "12px" }}
                          >
                            {handleForm.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className=" col-md-6">
                      <div className="mb-4 w-100" dir="ltr">
                        <PhoneInput
                          defaultCountry="sa"
                          value={handleForm.values.phone}
                          onChange={handlePhoneNumberChange}
                          onBlur={handleForm.handleBlur}
                          placeholder="رقم الجوال"
                          className="phone-input-field"
                          aria-label="phone"
                          required
                        />
                        {handleForm.errors.phone && handleForm.touched.phone ? (
                          <div
                            className="alert alert-danger my-2"
                            dir="rtl"
                            role="alert"
                            style={{ fontSize: "12px" }}
                          >
                            {handleForm.errors.phone}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className=" col-md-12">
                      <textarea
                        value={handleForm.values.message}
                        onChange={handleForm.handleChange}
                        onBlur={handleForm.handleBlur}
                        id="message"
                        aria-label="message"
                        placeholder="محتوى الرسالة"
                        className=" form-control"
                      ></textarea>
                      {handleForm.errors.message &&
                      handleForm.touched.message ? (
                        <div
                          className="alert alert-danger my-2"
                          dir="rtl"
                          role="alert"
                          style={{ fontSize: "12px" }}
                        >
                          {handleForm.errors.message}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className=" px-3 text-danger text-center">
                      {errorMessage}
                    </p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center m-5 ">
                    <button
                      type="submit"
                      disabled={!handleForm.dirty || !handleForm.isValid}
                      className="follow mt-3"
                    >
                      {loading ? (
                        <TailSpin
                          visible={true}
                          height="35"
                          width="35"
                          color="#fff"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "إرسال"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className=" col-md-3">
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp">
              <p className=" px-3 "> الإدارة المالية</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="mailto:finance@tajwal.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 "
                  >
                    finance@tajwal.co
                  </a>
                  <Image
                    src={emailcontect}
                    width={30}
                    height={30}
                    alt="emailcontect"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="tel:+966505123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5"
                    dir="ltr"
                  >
                    966 505 12 3456
                  </a>
                  <Image
                    src={phonecontect}
                    width={30}
                    height={30}
                    alt="phonecontect"
                  />
                </div>
              </div>
            </div>
            <div
              className=" bg-white shadow-sm rounded-2 pt-3 pb-4  ContactUSp"
              style={{ marginTop: "95px" }}
            >
              <p className=" px-3 ">الإدارة العامة</p>
              <div className="  d-flex justify-content-center align-items-center">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="mailto:info@tajwal.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5 "
                  >
                    info@tajwal.co
                  </a>
                  <Image
                    src={emailcontect}
                    width={30}
                    height={30}
                    alt="emailcontect"
                  />
                </div>
              </div>
              <div className="  d-flex justify-content-center align-items-center mt-3">
                <div
                  className=" d-flex   justify-content-end   align-items-center w-75 "
                  style={{ backgroundColor: "#F1F3F6" }}
                >
                  <a
                    href="tel:+966505123456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-5"
                    dir="ltr"
                  >
                    966 505 12 3456{" "}
                  </a>
                  <Image
                    src={phonecontect}
                    width={30}
                    height={30}
                    alt="phonecontect"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
