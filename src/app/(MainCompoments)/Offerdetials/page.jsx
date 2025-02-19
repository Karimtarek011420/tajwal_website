"use client";
import { useSearchParams } from "next/navigation";
import "./offerdetilas.css";
const OfferDetails = () => {
  const searchParams = useSearchParams();
  const offer_url = searchParams.get("offer_url");

  return (
    <div className="offers position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="p-5"> تفاصيل العرض</span>
          </li>
        </ul>
      </div>
      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <iframe
          src={offer_url}
          loading="lazy"
          style={{
            width: "60%",
            height: "100vh",
            border: "none",
            overflow: "hidden",
          }}
          className="offerifrem"
          title="Offer Details"
        />
      </div>
    </div>
  );
};

export default OfferDetails;
