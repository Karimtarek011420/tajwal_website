"use client";
import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_BASE_URL } from "@/app/utils/config";

export default function OffersPage() {
  const [offers, setOffers] = useState(null);

  const router = useRouter();
  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/slid_offer`, {
        headers: {
          Accept: "application/json",
        },
      });
      setOffers(data.data);
      console.log(data.data);
    } catch (err) {
      console.error(err);
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
            <span>العروض</span>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <div className="row gy-4">
          {offers?.map((offer, index) => (
            <div key={index} className="col-md-4">
              <div
                className="offer rounded-5 shadow-sm"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={offer.image}
                  alt="offer_image"
                  width={414}
                  height={207}
                  className="w-100"
                  loading="lazy"
                />
                <div className="pt-5 pb-3 d-flex justify-content-center align-items-center">
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
