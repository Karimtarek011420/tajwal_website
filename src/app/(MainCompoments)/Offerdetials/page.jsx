"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import "./offerdetilas.css";

const OfferDetails = () => {
  const searchParams = useSearchParams();
  const offer_url = searchParams.get("offer_url");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="offers position-relative pt-5 ">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-lg-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            <span className="p-5"> تفاصيل العرض</span>
          </li>
        </ul>
      </div>

      {/* اللودنج سبينر يظهر فقط أثناء التحميل */}
      {isLoading && (
        <div
          className="loading-overlay d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={80} color="var(--primary-color)" />
        </div>
      )}

      <div
        className=" container py-5 d-flex justify-content-center align-items-center"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <iframe
          src={offer_url}
          loading="lazy"
          onLoad={() => setIsLoading(false)} // إخفاء اللودنج عند اكتمال التحميل
          style={{
            width: "60%",
            height: "100vh",
            border: "none",
            overflow: "hidden",
          }}
          className="offerifrem mb-5"
          title="Offer Details"
        />
      </div>
    </div>
  );
};

export default OfferDetails;
