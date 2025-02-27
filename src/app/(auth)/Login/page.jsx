"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import LoginUser from "@/assets/images/login.svg";
import AuthLinks from "@/app/_Compontents/AuthLinks/AuthLinks";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { API_BASE_URL, API_V2_BASE_URL } from "@/app/utils/config";
const LoginPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { settoken } = useContext(authtoken);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!phoneNumber) {
      setErrorMessage("يرجى إدخال رقم الهاتف.");
      setLoading(false);
      return;
    } else if (!/^\+\d{11,15}$/.test(phoneNumber)) {
      setErrorMessage("يرجى إدخال رقم هاتف صالح.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      let formattedPhone = phoneNumber;
      if (phoneNumber.startsWith("+966")) {
        let withoutCountryCode = phoneNumber.replace("+966", "");
        if (!withoutCountryCode.startsWith("0")) {
          withoutCountryCode = "0" + withoutCountryCode;
        }
        formattedPhone = withoutCountryCode; // حفظ الرقم الجديد بدون كود الدولة
      }
      const response = await axios.post(
        `${API_V2_BASE_URL}/check_if_user_exist`,
        {
          phone_number: formattedPhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          validateStatus: (status) => status < 500, // السماح بإدارة الأخطاء يدوياً
        }
      );
      if (response.status === 200 && response.data?.success) {
        setStep(2);
      } else if (response.status === 400 || response.status === 404) {
        toast.success("ليس لديك حساب قم بتجسيل حساب! ", {
          duration: 1500,
          style: { backgroundColor: "#4b87a4", color: "white" },
        });
        setTimeout(() => {
          router.push("/Register");
        }, 800);
      } else {
        throw new Error("استجابة غير متوقعة من الخادم");
      }
    } catch (error) {
      setErrorMessage("حدث خطأ، يرجى المحاولة مرة أخرى.");
    }
    setErrorMessage("");
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const regexPassword = /^.{8,}$/;

    if (!password) {
      setErrorMessage("يرجى إدخال كلمة المرور.");
      return;
    }

    if (!regexPassword.test(password)) {
      setErrorMessage("الرقم السرى غير صحيح");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      let formattedPhone = phoneNumber;

      // التحقق من كود الدولة
      if (phoneNumber.startsWith("+966")) {
        let withoutCountryCode = phoneNumber.replace("+966", ""); // إزالة كود الدولة

        // إذا لم يبدأ الرقم بـ 0، نضيف 0 في البداية
        if (!withoutCountryCode.startsWith("0")) {
          withoutCountryCode = "0" + withoutCountryCode;
        }

        formattedPhone = withoutCountryCode; // حفظ الرقم الجديد بدون كود الدولة
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/login`,
        {
          phone_number: formattedPhone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("تم تسجيل الدخول بنجاح!", {
          duration: 1500,
          style: { backgroundColor: "#4b87a4", color: "white" },
        });

        localStorage.setItem("token", data.data.token);
        settoken(data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        setTimeout(() => router.push("/"), 1000);
      } else {
        setErrorMessage(data.message || "فشل تسجيل الدخول. حاول مرة أخرى.");
      }
    } catch (error) {
      setErrorMessage("فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login pt-5 pb-4">
      <div className="text-center d-flex justify-content-center align-items-center  mb-4">
        <Image
          src={LoginUser}
          layout="responsive"
          alt="LoginUser"
          width={408}
          height={307}
        />
      </div>
      <div className="bg-white shadow-sm rounded-3 px-4 py-5 ">
        {step === 1 && (
          <>
            <div className="mb-2" dir="ltr">
              <PhoneInput
                defaultCountry="sa"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="رقم الجوال"
                className="phone-input-field"
                aria-label="phone_number"
                required
              />
            </div>
            {errorMessage && (
              <p
                className="px-3 text-danger text-center mt-3"
                style={{ fontSize: "13px" }}
              >
                {errorMessage}
              </p>
            )}
            <div className="d-flex justify-content-center align-items-center my-3">
              <button onClick={handlePhoneSubmit} className="follow mt-2">
                {loading ? (
                  <TailSpin
                    visible={true}
                    height="35"
                    width="35"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                  />
                ) : (
                  "متابعة"
                )}
              </button>
            </div>
            <AuthLinks />
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleLoginSubmit}>
            <div className="p-login text-center py-2">
              <p>ادخل الرقم السري للمتابعة</p>
            </div>
            <div className="mb-4 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="password"
                placeholder="الرقم السرى"
                aria-label="Password"
                required
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#aaa",
                }}
              ></i>
            </div>
            {errorMessage && (
              <p className="px-3 text-danger text-center">{errorMessage}</p>
            )}
            <div className="d-flex justify-content-end">
              <Link href="/ForgetPassword">
                <p className="loginpass"> نسيت الرقم السرى ؟</p>
              </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2 mb-3">
              <button type="submit" className="follow " disabled={loading}>
                {loading ? (
                  <TailSpin
                    visible={true}
                    height="35"
                    width="35"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                  />
                ) : (
                  "متابعة"
                )}
              </button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className=" back  mb-3"
                onClick={() => setStep(1)}
              >
                العودة للخلف
              </button>
            </div>
            <AuthLinks />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
