"use client";
import React, { useEffect, useState } from "react";
import "./Helpcenter.css";
export default function OffersPage() {
  return (
    <div className="Helpcenter position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5">مركز المساعدة</span>
          </li>
        </ul>
      </div>
      <div className=" container pb-5 pt-3">
        <p className=" text-center Helpcenterp pb-3">
          مالذي تحتاج المساعدة فيه؟
        </p>
        <div className=" search-bar">
          <button className="search-button" aria-label="Search">
            <i className="fas fa-search"></i>
          </button>
          <input type="text" placeholder="اكتب نبذة عن المشكلة التي تواجهها" />
          <p className="Helpcenterpsearch">ابحث</p>
        </div>
      </div>
    </div>
  );
}
