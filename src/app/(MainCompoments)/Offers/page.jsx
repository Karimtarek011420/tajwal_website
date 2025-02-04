"use client";
import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function OffersPage() {
  const [offers, setOffers] = useState(null);

  const router = useRouter();
  const fetchOffers = async () => {
    try {
      const { data } = await axios.get(
        "https://api.tajwal.co/api/v1/slid_offer",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setOffers(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleClick = (offerUrl) => {
    router.push(`/Offerdetials?offer_url=${(offerUrl)}`);
  };
  return (
    <div className="offers position-relative py-5">
      <div className="position-absolute country-list w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-linkslist bg-white mx-lg-2"
            style={{ color: "#336279" }}
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
                <img
                  src={offer.image}
                  alt="offer_image"
                  className="w-100"
                  loading="lazy"
                />
                <div className="pt-5 pb-3 d-flex justify-content-center align-items-center">
                  <button
                    className="btnoffer"
                    onClick={() => handleClick(offer.offer_url)}
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
