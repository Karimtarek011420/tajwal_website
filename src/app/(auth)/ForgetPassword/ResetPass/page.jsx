"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import imageResetpassword from "@/assets/images/ChangePassword.svg";
import "./resetpass.css";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { API_BASE_URL } from "@/app/utils/config";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const phone = localStorage.getItem("phonepass") || "";
      const otpCode = localStorage.getItem("passOtp") || "";

      setPhoneNumber(phone.trim());
      setOtp(otpCode.trim());

      // تحديث قيمة OTP في formik بعد تحميلها من localStorage
      handleSubmitPass.setFieldValue("otp", otpCode.trim());
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const apiResetPass = async (values) => {
    setLoading(true);

    let formattedPhone = phoneNumber.trim();
    if (formattedPhone.startsWith("+966")) {
      let withoutCountryCode = formattedPhone.replace("+966", "").trim();

      if (!withoutCountryCode.startsWith("0")) {
        withoutCountryCode = "0" + withoutCountryCode;
      }

      formattedPhone = withoutCountryCode;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/reset_password`,
        { ...values, phone_number: formattedPhone },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("تم تغيير كلمة السر بنجاح", {
          duration: 1500,
          style: {
            backgroundColor: "#4b87a4",
            color: "white",
          },
        });

        localStorage.clear();
        router.push("/Login");
      }
    } catch (error) {
      console.log(error);

      setErrorMessage("فشل تغيير كلمة السر، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPass = useFormik({
    initialValues: {
      otp: "", // اجعلها فارغة لأننا سنقوم بتحديثها بعد جلبها من localStorage
      phone_number: phoneNumber,
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.password.trim().length < 8) {
        errors.password = "يجب أن تحتوي كلمة السر على 8 أحرف على الأقل.";
      }
      if (values.password.trim() !== values.confirm_password.trim()) {
        errors.confirm_password = "كلمة السر وتأكيدها غير متطابقين.";
      }
      return errors;
    },
    onSubmit: (values) => {
      apiResetPass(values);
    },
  });

  return (
    <div className="container resetPassword pt-5 pb-4">
      <div className="text-center mb-5">
        <Image
          src={imageResetpassword}
          priority
          className="imageResetpassword"
          alt="Reset Password"
        />
      </div>
      <div className="bg-white shadow-lg rounded-4 px-4 py-5">
        <form onSubmit={handleSubmitPass.handleSubmit}>
          {/* حقل كلمة المرور */}
          <div className="mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={handleSubmitPass.values.password}
              onChange={handleSubmitPass.handleChange}
              onBlur={handleSubmitPass.handleBlur}
              className="form-control"
              placeholder="الرقم السري"
              required
            />
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
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
          {handleSubmitPass.errors.password &&
          handleSubmitPass.touched.password ? (
            <div className="alert alert-danger my-2">
              {handleSubmitPass.errors.password}
            </div>
          ) : null}

          {/* حقل تأكيد كلمة المرور */}
          <div className="mb-4 position-relative">
            <input
              type={showRePassword ? "text" : "password"}
              name="confirm_password"
              value={handleSubmitPass.values.confirm_password}
              onChange={handleSubmitPass.handleChange}
              onBlur={handleSubmitPass.handleBlur}
              className="form-control"
              placeholder="تأكيد الرقم السري"
              required
            />
            <i
              className={`fa-solid ${
                showRePassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={toggleRePasswordVisibility}
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
          {handleSubmitPass.errors.confirm_password &&
          handleSubmitPass.touched.confirm_password ? (
            <div className="alert alert-danger my-2">
              {handleSubmitPass.errors.confirm_password}
            </div>
          ) : null}

          {errorMessage && (
            <p className="px-3 text-danger text-center">{errorMessage}</p>
          )}

          {/* زر المتابعة */}
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="follow mt-3">
              {loading ? (
                <TailSpin height="35" width="35" color="#fff" />
              ) : (
                "متابعة"
              )}
            </button>
          </div>

          {/* زر العودة */}
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="follow back mt-3"
              onClick={() => router.back()}
            >
              العودة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
