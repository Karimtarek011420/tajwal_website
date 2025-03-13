"use client";
import React, { useEffect, useState } from "react";
import "./Simcard.css";
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
      <div className=" container py-5 bg-white shadow-sm rounded-3 position-relative">
        <div className=" position-absolute">
          <button> رمز QR</button>
        </div>
      </div>
    </div>
  );
}
