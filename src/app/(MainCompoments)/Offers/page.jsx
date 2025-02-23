"use client";
import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_BASE_URL } from "@/app/utils/config";

export default function OffersPage() {
  const [offers, setOffers] = useState(null);
  const [error, setError] = useState(null); // تخزين الخطأ

  const router = useRouter();
  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/slid_offer`, {
        headers: {
          Accept: "application/json",
        },
      });
      setOffers(data.data);
      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);
  const handleClick = (offer) => {
    if (offer.offer_url) {
      router.push(`/Offerdetials?offer_url=${offer.offer_url}`);
    } else {
      router.push(`/Countries/${offer.country_id}`);
    }
  };

  return (
    <div className="offers position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span className="p-5">العروض</span>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <div>
          {error && <p className="text-danger text-center" style={{minHeight:'30vh'}}>{error}</p>}{" "}
          {/* عرض الخطأ إن وجد */}
        </div>
        <div className="row gy-4">
          {offers?.map((offer, index) => (
            <div key={index} className="col-md-4">
              <div
                className="offer rounded-4 shadow-sm"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={offer.image}
                  alt="offer_image"
                  width={380}
                  height={180}
                  className="w-100"
                  loading="lazy"
                />
                <div className="pt-4 pb-3 d-flex justify-content-center align-items-center">
                  <button
                    className="btnoffer"
                    onClick={() => handleClick(offer)}
                  >
                    تفاصيل العرض
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
