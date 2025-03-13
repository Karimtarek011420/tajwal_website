"use client";
import React, { useEffect, useState } from "react";
import "./Simcard.css";
import Link from "next/link";
export default function SimcardPage() {
  return (
    <div className="Simcard  position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5">طريقة تثبيت الشريحة</span>
          </li>
        </ul>
      </div>
      <div className=" container py-5 bg-white shadow-sm rounded-3 position-relative mt-5">
        <div className="position-absolute Simcarchoose  d-flex justify-content-center align-items-center">
          <button className="Simcard-list-links  ">رمز QR</button>
          <button className="Simcard-list-links ">يدوي</button>
        </div>
      </div>
    </div>
  );
}
