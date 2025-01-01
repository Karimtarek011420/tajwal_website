import React from "react";
import "./offers.css";
import axios from "axios";
import Image from "next/image";
export default async function page() {
  const fetchOffers = async () => {
    const { data } = await axios.get(
      "https://api.tajwal.co/api/v1/slid_offer",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.data;
  };
  const Alloffers = await fetchOffers();
  return (
    <>
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
        <div className=" container py-5 ">
          <div className=" row gy-4">
            {Alloffers?.map((offer, index) => {
              return (
                <div key={index} className="col-md-4">
                  <div
                    className="offer rounded-5 shadow-sm"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={offer.image}
                      alt="imageoofer"
                      className=" w-100"
                    />
                    <div className=" pt-5 pb-3 d-flex justify-content-center align-items-center">
                      <button className="btnoffer">تفاصيل العرض</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
