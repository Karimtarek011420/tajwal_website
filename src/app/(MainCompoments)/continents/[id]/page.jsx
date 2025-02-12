"use client";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import icon1 from "@/assets/images/Icon1.svg";
import icon1dark from "@/assets/images/Icon1dark.svg";
import icon2 from "@/assets/images/Icon2dark.svg";
import icon2dark from "@/assets/images/Icon2.svg";
import icon3 from "@/assets/images/icon3.svg";
import icon3dark from "@/assets/images/icon3dark.svg";
import icon4dark from "@/assets/images/icon4.svg";
import icon4 from "@/assets/images/icon4dark.svg";
import icon5 from "@/assets/images/icon5.svg";
import icon5dark from "@/assets/images/icon5dark.svg";
import icon6m from "@/assets/images/icon6m.svg";
import iconip from "@/assets/images/iconip.svg";
import "./details.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePackage } from "@/app/_Compontents/PackageContext/PackageContext";
import { Modal, Box, Button, Typography } from "@mui/material";
export default function DetailsCountry({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedPackagepur } = usePackage(); // استخدام السياق
  const [open, setOpen] = useState(false);

  const getCountryDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.tajwal.co/api/v1/continents/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setData(response.data?.data); // تأكد من وجود البيانات
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const firstCountry = data[0]; // الحصول على أول دولة
      if (firstCountry.days && firstCountry.days.length > 0) {
        setSelectedDay(firstCountry.days[0]); // تعيين أول قيمة في مصفوفة الأيام
      }
    }
  }, [data]); // يتم تشغيل هذا عند تغيير البيانات

  useEffect(() => {
    if (id) getCountryDetails();
  }, [id]);
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const openModal = (pkg, operator) => {
    setSelectedPackage({ ...pkg, operator });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPackage(null);
    setIsModalOpen(false);
  };
  const handlePurchase = () => {
    setSelectedPackagepur(selectedPackage);
    router.push("/Purchase");
  };

  return (
    <div className="countrydetials position-relative py-5">
      {Array.isArray(data) &&
        data.map((country) => (
          <div key={country.country_code}>
            <div className="position-absolute country-list w-100">
              <ul className="list-unstyled d-flex justify-content-center align-items-center">
                <li
                  className="country-list-linkslist bg-white mx-lg-2"
                  style={{ color: "#336279" }}
                >
                  <Image
                    src={country.image}
                    width={35}
                    height={25}
                    alt={country.title}
                  />
                  <span className="mx-3">{country.title}</span>
                </li>
              </ul>
            </div>
            <div className="container">
              <div className="d-flex flex-wrap justify-content-center align-items-center pt-2 pb-4">
                {country?.days?.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className="btn-day mx-1 my-2 px-3 py-1 rounded-1"
                    style={{
                      backgroundColor:
                        selectedDay === day ? "#336279" : "transparent",
                      color: selectedDay === day ? "#fff" : "#336279",
                    }}
                  >
                    {day} {day <= 10 ? "أيام" : "يوم"}
                  </button>
                ))}
              </div>

              <div className="row gy-5 py-5">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                  }}
                >
                  {country.operators.map((operator) =>
                    operator.packages
                      .filter((pkg) => pkg.day === parseInt(selectedDay))
                      .map((pkg) => (
                        <div
                          key={pkg.id}
                          style={{
                            width: "400px",
                            borderRadius: "10px",
                            boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
                            background:
                              pkg.amount === -1
                                ? "linear-gradient(to top, #336279, #5EB5DF)" // تدرج لوني للحزم غير المحدودة
                                : "white", // تدرج لوني للحزم المحدودة
                          }}
                          className=" position-relative"
                        >
                          <div className=" countydtailsup d-flex justify-content-around align-items-center position-absolute ">
                            <div>
                              <Image
                                src={country.image}
                                width={80}
                                height={35}
                                alt={country.title}
                              />
                            </div>
                            <div>
                              <span
                                style={{
                                  backgroundColor:
                                    pkg.amount === -1 ? "#F9F9F9" : "#D9DEE4",
                                  fontSize: "13px",
                                  fontWeight: "300",
                                }}
                                dir="ltr"
                                className=" px-4 py-2 rounded-2"
                              >
                                {pkg.amount === -1
                                  ? "لا محدود"
                                  : `${pkg.amount / 1000}GB`}
                              </span>
                            </div>
                          </div>
                          <div className="py-5">
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon1 : icon1dark}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="mx-2 my-0">التغطية</p>
                              </div>
                              <div>
                                <Button
                                  variant="contained"
                                  onClick={() => setOpen(true)}
                                  sx={{
                                    backgroundColor: "#336279",
                                  }}
                                >
                                  {operator.countries.length} دولة
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={() => setOpen(false)}
                                  BackdropProps={{
                                    sx: {
                                      backgroundColor: "rgba(0, 0, 0, 0.2)", // تعديل شفافية الخلفية
                                    },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "90%", // يجعل المودال متجاوبًا على الشاشات الصغيرة
                                      maxWidth: 500, // الحد الأقصى للعرض
                                      bgcolor: "white",
                                      p: 2,
                                      mx: "auto",
                                      mt: "8vh",
                                      borderRadius: 2,
                                      boxShadow:
                                        "0px 4px 10px rgba(0, 0, 0, 0.3)", // ظل خفيف
                                    }}
                                  >
                                    <Typography variant="h6">
                                      دول التغطية
                                    </Typography>

                                    {/* جعل الدول تظهر بجانب بعضها */}
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        mt: 2,
                                      }}
                                    >
                                      {operator.countries.map(
                                        (countery, index) => (
                                          <Box
                                            key={`${countery.country_code}-bbbbb-${index}`}
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              border: "1px solid #ddd", // إطار خفيف حول كل عنصر
                                              borderRadius: 2,
                                              px: 1,
                                            }}
                                          >
                                            <Image
                                              src={countery.image}
                                              height={20}
                                              width={20}
                                              alt={countery.title}
                                            />
                                            <Typography
                                              sx={{
                                                px: 1,
                                              }}
                                            >
                                              {countery.title}
                                            </Typography>
                                          </Box>
                                        )
                                      )}
                                    </Box>

                                    <Button
                                      onClick={() => setOpen(false)}
                                      sx={{
                                        mt: 2,
                                        px: 5,
                                        backgroundColor: "#336279",
                                        color: "#ffffff",
                                        border: "1px solid #336279",
                                        // جعل الزر بعرض الشاشة في الشاشات الصغيرة
                                      }}
                                    >
                                      إغلاق
                                    </Button>
                                  </Box>
                                </Modal>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#fff",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon2 : icon2dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className=" text-white"
                                />
                                <p className="mx-2 my-0">البيانات</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {pkg.amount === -1
                                    ? "لا محدود"
                                    : `${pkg.amount / 1000} غيغا بايت`}
                                </p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon3 : icon3dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className=" text-white"
                                />
                                <p className="mx-2 my-0">الصلاحية</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {pkg.day} {pkg.day <= 10 ? "أيام" : "يوم"}
                                </p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#fff",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon4 : icon4dark}
                                  width={13}
                                  height={16}
                                  alt="iconcountry"
                                  className="text-white"
                                />
                                <p className="mx-2 my-0">السعر</p>
                              </div>
                              <div>
                                <p className="my-0">{pkg.price} ر.س</p>
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center text-center p-3 rounded-2 m-3"
                              style={{
                                backgroundColor:
                                  pkg.amount === -1 ? "#F1F3F666" : "#F1F3F666",
                                color:
                                  pkg.amount === -1 ? "#FFFFFF" : "#626E7B",
                                fontSize: "12px",
                                fontWeight: "400",
                              }}
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                <Image
                                  src={pkg.amount === -1 ? icon5 : icon5dark}
                                  width={16}
                                  height={16}
                                  alt="iconcountry"
                                />
                                <p className="mx-2 my-0">قابلة للتجديد</p>
                              </div>
                              <div>
                                <p className="my-0">
                                  {operator.rechargeability === true
                                    ? "نعم"
                                    : "لا"}
                                </p>
                              </div>
                            </div>
                            <div className=" d-flex justify-content-center align-items-center">
                              <button
                                onClick={() => openModal(pkg, operator)}
                                style={{
                                  backgroundColor: "transparent",
                                  padding: "10px 60px",
                                  color: pkg.amount === -1 ? "#fff" : "#336279",
                                  border:
                                    pkg.amount === -1
                                      ? "2px #fff solid"
                                      : "2px #336279 solid",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  marginTop: "10px",
                                }}
                              >
                                اختيار
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
            <div className=" d-flex justify-content-center align-items-center pt-5">
              <Link
                href="/Countries "
                className=" countryshow text-white  px-5 py-3"
              >
                عرض جميع الدول
              </Link>
            </div>
          </div>
        ))}
      {isModalOpen && selectedPackage && (
        <div className="modelopen">
          <div className="modal-content">
            <button className="closeModal" onClick={closeModal}>
              <i
                className="fa-solid fa-xmark text-white fs-6 p-3 rounded-2"
                style={{ backgroundColor: "#336279" }}
              ></i>
            </button>
            <div className="row gy-1 py-lg-3 justify-content-center align-items-center modal-contentmedia">
              <div className="col-md-4 text-center">
                <div>
                  <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{
                      backgroundColor: "#336279",
                    }}
                  >
                    {selectedPackage.operator.countries.length} دولة
                  </Button>
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    BackdropProps={{
                      sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)", // تعديل شفافية الخلفية
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "90%", // يجعل المودال متجاوبًا على الشاشات الصغيرة
                        maxWidth: 500, // الحد الأقصى للعرض
                        bgcolor: "white",
                        p: 2,
                        mx: "auto",
                        mt: "8vh",
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // ظل خفيف
                      }}
                    >
                      <Typography variant="h6">دول التغطية</Typography>

                      {/* جعل الدول تظهر بجانب بعضها */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {selectedPackage.operator.countries.map(
                          (countery, index) => (
                            <Box
                              key={`${countery.country_code}-title-${index}`}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ddd", // إطار خفيف حول كل عنصر
                                borderRadius: 2,
                                px: 1,
                              }}
                            >
                              <Image
                                src={countery.image}
                                height={20}
                                width={20}
                                alt={countery.title}
                              />
                              <Typography
                                sx={{
                                  px: 1,
                                }}
                              >
                                {countery.title}
                              </Typography>
                            </Box>
                          )
                        )}
                      </Box>

                      <Button
                        onClick={() => setOpen(false)}
                        sx={{
                          mt: 2,
                          px: 5,
                          backgroundColor: "#336279",
                          color: "#ffffff",
                          border: "1px solid #336279",
                          // جعل الزر بعرض الشاشة في الشاشات الصغيرة
                        }}
                      >
                        إغلاق
                      </Button>
                    </Box>
                  </Modal>
                </div>
                {/* <div>
                  {selectedPackage.operator.countries.map((country, index) => (
                    <Image
                      key={`${country.country_code}-${index}`} // حل مشكلة المفاتيح المتكررة
                      src={country.image}
                      height={54}
                      width={75}
                      alt={country.title}
                    />
                  ))}
                </div>
                <div>
                  {selectedPackage.operator.countries.map((country, index) => (
                    <p
                      key={`${country.country_code}-title-${index}`}
                      className="py-lg-3"
                      style={{
                        color: "#575050",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      {country.title}
                    </p>
                  ))}
                </div> */}
              </div>
              <div className="col-md-8">
                <div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-3 contentsimmodel ">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon1dark}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">التغطية</p>
                    </div>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{
                          backgroundColor: "#336279",
                        }}
                      >
                        {selectedPackage.operator.countries.length} دولة
                      </Button>
                      <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        BackdropProps={{
                          sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)", // تعديل شفافية الخلفية
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "90%", // يجعل المودال متجاوبًا على الشاشات الصغيرة
                            maxWidth: 500, // الحد الأقصى للعرض
                            bgcolor: "white",
                            p: 2,
                            mx: "auto",
                            mt: "8vh",
                            borderRadius: 2,
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // ظل خفيف
                          }}
                        >
                          <Typography variant="h6">دول التغطية</Typography>

                          {/* جعل الدول تظهر بجانب بعضها */}
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            {selectedPackage.operator.countries.map(
                              (countery, index) => (
                                <Box
                                  key={`${countery.country_code}-flag-${index}`}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #ddd", // إطار خفيف حول كل عنصر
                                    borderRadius: 2,
                                    px: 1,
                                  }}
                                >
                                  <Image
                                    src={countery.image}
                                    height={20}
                                    width={20}
                                    alt={countery.title}
                                  />
                                  <Typography
                                    sx={{
                                      px: 1,
                                    }}
                                  >
                                    {countery.title}
                                  </Typography>
                                </Box>
                              )
                            )}
                          </Box>

                          <Button
                            onClick={() => setOpen(false)}
                            sx={{
                              mt: 2,
                              px: 5,
                              backgroundColor: "#336279",
                              color: "#ffffff",
                              border: "1px solid #336279",
                              // جعل الزر بعرض الشاشة في الشاشات الصغيرة
                            }}
                          >
                            إغلاق
                          </Button>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 bg-white contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon2dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">البيانات</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.amount === -1
                          ? "لا محدود"
                          : `${selectedPackage.amount / 1000} غيغا بايت`}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon3dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className=" text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">الصلاحية</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.day}{" "}
                        {selectedPackage.day <= 10 ? "أيام" : "يوم"}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 bg-white contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon4dark}
                        width={13}
                        height={16}
                        alt="iconcountry"
                        className="text-white"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">السعر</p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.price} ر.س
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-center  rounded-2 mt-2 contentsimmodel">
                    <div className="d-flex align-items-center justify-content-center">
                      <Image
                        src={icon5dark}
                        width={16}
                        height={16}
                        alt="iconcountry"
                      />
                      <p className="mx-2 my-0 contentsimmodelp">
                        قابلة للتجديد
                      </p>
                    </div>
                    <div>
                      <p className="my-0 contentsimmodelp">
                        {selectedPackage.operator.rechargeability === true
                          ? "نعم"
                          : "لا"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row gy-1 py-lg-2 mt-lg-2 mt-1 pt-1"
              style={{ backgroundColor: "#F9F9F9" }}
            >
              <div className="col-md-4">
                <p className="textmodelp">
                  دول التغطية{" "}
                  <span className="mx-1">
                    ( {selectedPackage.operator.countries.length} دولة)
                  </span>
                </p>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{
                      backgroundColor: "#336279",
                    }}
                  >
                    {selectedPackage.operator.countries.length} دولة
                  </Button>
                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    BackdropProps={{
                      sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",  
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "90%", 
                        maxWidth: 500, 
                        bgcolor: "white",
                        p: 2,
                        mx: "auto",
                        mt: "8vh",
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", 
                      }}
                    >
                      <Typography variant="h6">دول التغطية</Typography>

                      
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {console.log(selectedPackage.operator.countries)}
                        {selectedPackage.operator.countries.map(
                          (countery, index) => (
                            <Box
                            key={`${countery.country_code}-kkk-${index}`}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ddd", // إطار خفيف حول كل عنصر
                                borderRadius: 2,
                                px: 1,
                              }}
                            >
                              <Image
                                src={countery.image}
                                height={20}
                                width={20}
                                alt={countery.title}
                              />
                              <Typography
                                sx={{
                                  px: 1,
                                }}
                              >
                                {countery.title}
                              </Typography>
                            </Box>
                          )
                        )}
                      </Box>

                      <Button
                        onClick={() => setOpen(false)}
                        sx={{
                          mt: 2,
                          px: 5,
                          backgroundColor: "#336279",
                          color: "#ffffff",
                          border: "1px solid #336279",
                          // جعل الزر بعرض الشاشة في الشاشات الصغيرة
                        }}
                      >
                        إغلاق
                      </Button>
                    </Box>
                  </Modal>
                </div>
              </div>
              <div className="col-md-8 ">
                <p className="textmodelp">معلومات إضافية</p>
                <div className=" w-100  rounded-2 bg-white shadow-sm p-1">
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-lg-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center ">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">الشبكة</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.coverages.map(
                            (coverage) => (
                              <span key={coverage.name}>
                                {coverage.networks
                                  .map((network) => network.name)
                                  .join(", ")}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center ">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">نوع الباقة</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.plan_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center  px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          سياسة التفعيل
                        </p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.activation_policy}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center textmodelpsecond">
                        <Image
                          src={icon5dark}
                          width={10}
                          height={10}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          امكانية شحن الرصيد
                        </p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">
                          {selectedPackage.operator.rechargeability === true
                            ? "نعم "
                            : " لا"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={iconip}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">توجيه IP</p>
                      </div>
                      <div>
                        <p className="my-0 textmodelpsecond">لا</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center text-center px-lg-3 px-1 py-1  mt-lg-2">
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          src={icon6m}
                          width={11}
                          height={11}
                          alt="iconcountry"
                          className=" text-white"
                        />
                        <p className="mx-2 my-0 textmodelpsecond">
                          معلومات اخرى
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white d-flex justify-content-between  align-items-center">
              <button
                style={{
                  padding: "10px ",
                  backgroundColor: "#626E7B",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                className=" px-5 py-lg-2 py-1 mx-3"
                onClick={handlePurchase}
              >
                شراء
              </button>
              <div
                className="p-lg-2 p-1"
                style={{
                  color: "#575050",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                <p>{selectedPackage.price} ر.س</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
