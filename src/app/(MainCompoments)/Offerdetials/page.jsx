"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "./offerdetilas.css";

const OfferDetails = () => {
  const searchParams = useSearchParams();
  const offer_url = searchParams.get("offer_url");
  const [error, setError] = useState(null); // تخزين الخطأ

  useEffect(() => {
    // التحقق من صحة الرابط
    if (!offer_url || !/^https?:\/\//.test(offer_url)) {
      setError("الرابط غير صالح أو مفقود.");
    }
  }, [offer_url]);

  return (
    <div className="offers position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span> تفاصيل العرض</span>
          </li>
        </ul>
      </div>

      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <iframe
            src={offer_url}
            loading="lazy"
            style={{
              width: "60%",
              height: "100vh",
              border: "none",
              overflow: "hidden",
            }}
            title="Offer Details"
            onError={() =>
              setError("حدث خطأ أثناء تحميل العرض، حاول مرة أخرى.")
            }
          />
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
