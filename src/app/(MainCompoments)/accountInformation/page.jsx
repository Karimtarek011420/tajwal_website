"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./accountinform.css";
import { usePathname, useRouter } from "next/navigation";
import { authtoken } from "@/app/_Compontents/Authtoken/Authtoken";
import { logoutApi } from "@/app/Hookshelp/logout";
import axios from "axios";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { API_BASE_URL } from "@/app/utils/config";
import withAuth from "@/app/utils/withAuth";

function AccountInformation() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  const [modalData, setModalData] = useState({ field: "", value: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  const { token, settoken } = useContext(authtoken);
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = () => {
    if (token) {
      logoutApi(token, settoken);
      setTimeout(() => {
        router.push("/");
      });
    }
  };
  const isValidPhoneNumber = (phoneNumber) => /^\+\d{11,15}$/.test(phoneNumber);
  const isValidOtp = (otp) => /^\d{1,4}$/.test(otp);
  const createPhoneOtp = async (phoneNumber) => {
    setLoading(true);
    let formattedPhone = phoneNumber;
    if (formattedPhone.startsWith("+966")) {
      let withoutCountryCode = formattedPhone.replace("+966", "").trim();
      if (!withoutCountryCode.startsWith("0")) {
        withoutCountryCode = "0" + withoutCountryCode;
      }
      formattedPhone = withoutCountryCode;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/create_phone_change_otp`,
        { phone_number: formattedPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      let errorMessage = "رقم الهاتف مستخدم بالفعل.";
      if (error) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 404) {
          errorMessage = "رقم الهاتف مستخدم بالفعل.";
        }
      } else if (error.request) {
        errorMessage = "فشل الاتصال بالخادم. يرجى التحقق من الإنترنت.";
      }
      Swal.fire({
        icon: "error",
        text: errorMessage,
        toast: true,
        timer: 2000,
        position: "top",
        showConfirmButton: false,
      });

      return Promise.reject(errorMessage); // ✅ إرجاع الخطأ بدلاً من `null`
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneNumber = async (otp, phoneNumber) => {
    setLoading(true);
    let formattedPhone = phoneNumber;

    if (formattedPhone.startsWith("+966")) {
      let withoutCountryCode = formattedPhone.replace("+966", "").trim();

      if (!withoutCountryCode.startsWith("0")) {
        withoutCountryCode = "0" + withoutCountryCode;
      }

      formattedPhone = withoutCountryCode;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/update_phone`,
        { otp, phone_number: formattedPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "فشل في تحديث رقم الهاتف. يرجى المحاولة مرة أخرى.",
        toast: true,
        timer: 2000,
        position: "top",
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
      setshow(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "فشل في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.",
        toast: true,
        timer: 2000,
        position: "top",
        showConfirmButton: false,
      });
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (modalData.field === "phone_number") {
        if (!modalData.otp) {
          if (!isValidPhoneNumber(modalData.value)) {
            Swal.fire({
              icon: "error",
              text: "الرجاء إدخال رقم هاتف صحيح.",
              toast: true,
              timer: 2000,
              position: "top",
              showConfirmButton: false,
            });
            setLoading(false);
            return;
          }

          try {
            const response = await createPhoneOtp(modalData.value);

            if (response.error) {
              throw new Error(response.error);
            }

            Swal.fire({
              icon: "success",
              text: "تم إرسال رمز OTP بنجاح.",
              toast: true,
              timer: 2000,
              position: "top",
              showConfirmButton: false,
            });
            setshow(true);
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: error.message || "رقم الهاتف مستخدم بالفعل.",
              toast: true,
              timer: 2000,
              position: "top",
              showConfirmButton: false,
            });
          }
          return;
        } else {
          if (!isValidOtp(modalData.otp)) {
            Swal.fire({
              icon: "error",
              text: "يجب إدخال رمز OTP صحيح.",
              toast: true,
              timer: 2000,
              position: "top",
              showConfirmButton: false,
            });
            return;
          }

          await updatePhoneNumber(modalData.otp, modalData.value);

          let formattedPhone = modalData.value;
          if (formattedPhone.startsWith("+966")) {
            let withoutCountryCode = formattedPhone.replace("+966", "").trim();
            if (!withoutCountryCode.startsWith("0")) {
              withoutCountryCode = "0" + withoutCountryCode;
            }
            formattedPhone = withoutCountryCode;
          }

          const updatedData = { ...user, phone_number: formattedPhone };
          setUser(updatedData);
          localStorage.setItem("user", JSON.stringify(updatedData));

          Swal.fire({
            icon: "success",
            text: "تم تحديث رقم الهاتف بنجاح.",
            toast: true,
            timer: 2000,
            position: "top",
            showConfirmButton: false,
          });

          setModalData({ field: "", value: "", otp: "" });
          setLoading(false);
          return;
        }
      }

      // تحديث البريد الإلكتروني وكلمة المرور بدون تغييرات على التنسيق
      if (modalData.field === "email" || modalData.field === "password") {
        if (modalData.value.length === 0) {
          Swal.fire({
            icon: "error",
            text: "يرجى ملء الحقل.",
            toast: true,
            timer: 2000,
            position: "top",
            showConfirmButton: false,
          });
          setLoading(false);
          return;
        }

        if (
          modalData.field === "email" &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            modalData.value
          )
        ) {
          Swal.fire({
            icon: "error",
            text: "يرجى إدخال بريد إلكتروني صحيح.",
            toast: true,
            timer: 2000,
            position: "top",
            showConfirmButton: false,
          });
          setLoading(false);
          return;
        }

        if (modalData.field === "password" && modalData.value.length < 8) {
          Swal.fire({
            icon: "error",
            text: "كلمة المرور يجب أن تكون 8 حروف على الأقل.",
            toast: true,
            timer: 2000,
            position: "top",
            showConfirmButton: false,
          });
          setLoading(false);
          return;
        }
      }

      await updateProfile({ [modalData.field]: modalData.value });

      // تحديث البيانات في `user` و `localStorage`
      const updatedData = { ...user, [modalData.field]: modalData.value };
      setUser(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));

      Swal.fire({
        icon: "success",
        text: "تم التحديث بنجاح.",
        toast: true,
        timer: 2000,
        position: "top",
        showConfirmButton: false,
      });

      setModalData({ field: "", value: "", otp: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "حدث خطأ أثناء التحديث. يرجى المحاولة مرة أخرى.",
        toast: true,
        timer: 2000,
        position: "top",
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    Swal.fire({
      title: "🚨 هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946", // لون زر التأكيد
      cancelButtonColor: "#6c757d", // لون زر الإلغاء
      confirmButtonText: "نعم، احذف الحساب!",
      cancelButtonText: "إلغاء",
      customClass: {
        title: "swal-titleacount",
        popup: "swal-popupacount",
        confirmButton: "swal-confirmacount",
        cancelButton: "swal-cancelacount",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`${API_BASE_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (data.success) {
            setUser(null);
            setModalData({ field: "", value: "", otp: "" });

            Swal.fire({
              title: "✅ تم الحذف!",
              text: "تم حذف حسابك بنجاح.",
              icon: "success",
              customClass: {
                title: "swal-titleacount",
                popup: "swal-popupacount",
              },
            });

            setTimeout(() => {
              settoken(null);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/");
            }, 500);
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "❌ خطأ!",
            text: "حدث خطأ أثناء محاولة حذف الحساب.",
            icon: "error",
            customClass: {
              title: "swal-title",
              popup: "swal-popup",
            },
          });
        }
      }
    });
  };

  return (
    <div className="accountInformation position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-2 accountInformationp"
            style={{ backgroundColor: "var(--background)" }}
          >
            <span className="p-4"> معلومات الحساب</span>
          </li>
        </ul>
      </div>
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-4  offset-1">
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
                    <li className={pathName === "/Orders" ? "active" : ""}>
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
                  <Link href={"#"} onClick={handleLogout}>
                    <li
                      className="accountInformationlogout"
                      aria-label="Logout"
                    >
                      تسجيل الخروج
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className=" col-md-6 offset-1">
            <div className="changeinfo">
              <div className=" bg-white rounded-2 shadow-sm px-5 py-3">
                <p
                  style={{
                    color: "#B6BCC3",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  الاسم
                </p>
                <p
                  style={{
                    color: "#575050",
                    fontSize: "13px",
                    fontWeight: "300",
                  }}
                >
                  {user?.first_name}
                </p>
              </div>
              <div
                className=" boxchange rounded-2 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <p
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    رقم الجوال
                  </p>

                  <p
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                    dir="ltr"
                  >
                    {user?.phone_number}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({
                        field: "phone_number",
                        value: "",
                        otp: "",
                      })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
              <div
                className=" boxchange  rounded-2 shadow-sm px-5 py-3 my-4 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <p
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    البريد الإلكترونى
                  </p>
                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    <span>{user?.email}</span>
                  </h6>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({ field: "email", value: "", otp: "" })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
              <div
                className=" boxchange rounded-2 shadow-sm px-5 py-3 d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#F1F3F6" }}
              >
                <div>
                  <h6
                    style={{
                      color: "#B6BCC3",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    كلمة المرور الحالية
                  </h6>

                  <h6
                    style={{
                      color: "#575050",
                      fontSize: "13px",
                      fontWeight: "300",
                    }}
                  >
                    ********
                  </h6>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setModalData({ field: "password", value: "", otp: "" })
                    }
                    className=" btnchange border-0"
                  >
                    تغيير
                  </button>
                </div>
              </div>
              <div className=" boxchange rounded-2 shadow-sm px-4 py-3 mt-3">
                <p className="deleteacount">حذف الحساب</p>
                <p className="deleteacountp ">
                  بامكانك حذف حسابك بشكل نهائي، و لكن يجدر ذكر انه لا يمكنك
                  التراجع عن الحذف بعد حذف الحساب.
                </p>
                <div className=" d-flex justify-content-center">
                  <button
                    onClick={handleDelete}
                    className=" deleteacountbtn text-white rounded-3"
                  >
                    حذف الحساب
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modalData.field && (
          <div
            className={`modalaccountInformation ${
              modalData.field ? "modal-visible" : ""
            }`}
            onClick={(e) => {
              if (e.target.classList.contains("modal")) {
                setModalData({ field: "", value: "", otp: "" });
              }
            }}
          >
            <div className="modal-content " dir="ltr">
              <h6 className="modal-title mb-2 accountInformationp">
                {modalData.field}
              </h6>
              {modalData.field === "phone_number" ? (
                <>
                  <div className="inputchange">
                    <PhoneInput
                      defaultCountry="sa"
                      value={modalData.value}
                      onChange={(value) =>
                        setModalData({ ...modalData, value })
                      }
                      containerClassName="custom-phone-input"
                      inputClassName="custom-phone-input-field"
                    />
                  </div>
                  {show && (
                    <input
                      type="text"
                      className="changeinput mt-2"
                      placeholder=" OTP"
                      value={modalData.otp}
                      onChange={
                        (e) =>
                          setModalData({ ...modalData, otp: e.target.value }) // تحديث قيمة OTP
                      }
                    />
                  )}
                </>
              ) : (
                <input
                  type="text"
                  className="changeinput"
                  placeholder={` ${modalData.field}`}
                  value={modalData.value}
                  onChange={(e) =>
                    setModalData({ ...modalData, value: e.target.value })
                  }
                />
              )}

              <div className=" my-2">
                <button
                  onClick={handleUpdate}
                  className="form-control follow position-relative"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <TailSpin
                        visible={true}
                        height="20" // تقليل الحجم ليتناسب مع الزر
                        width="20"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                      />
                    </div>
                  ) : (
                    "تحديث"
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() =>
                    setModalData({ field: "", value: "", otp: "" })
                  }
                  className="followclose form-control  "
                >
                  إغلاق
                </button>
              </div>
            </div>

            {/* زر الإغلاق */}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(AccountInformation);
