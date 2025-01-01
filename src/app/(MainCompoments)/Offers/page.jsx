import React from "react";
import "./offers.css";
import axios from "axios";
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
    return data;
  };
  const Alloffers = await fetchOffers();
  console.log(Alloffers)
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
          <div className=" row gy-4"></div>
        </div>
      </div>
    </>
  );
}
