"use client";

import { useSearchParams } from "next/navigation";

const OfferDetails = () => {
  const searchParams = useSearchParams();
  const offer_url = searchParams.get("offer_url");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>تفاصيل العرض</h1>
      <iframe
        src={offer_url}
        style={{ width: "100%", height: "80vh", border: "none" }}
        title="Offer Details"
      />
    </div>
  );
};

export default OfferDetails;
