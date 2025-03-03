"use client";
import React, { useEffect, useState } from "react";
import "./Helpcenter.css";
export default function OffersPage() {
  return (
    <div className="offers position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5">العروض</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
