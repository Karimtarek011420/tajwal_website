"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../assets/images/arrow.svg";
import "./continents.css";
import axios from "axios";
import { usePathname } from "next/navigation";
export default function CountryHeader() {
  const [countries, setCountry] = useState(null);
  const pathname = usePathname(); // الحصول على المسار الحالي

  const getCountry = async () => {
    const { data } = await axios.get(
      "https://api.tajwal.co/api/v1/continents",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    setCountry(data.data);
  };
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="countryheader position-relative  py-5">
      <div className="position-absolute country-list w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <Link
            href={"/Countries"}
            className={`country-list-links mx-2 ${
              pathname === "/Countries" ? "active" : "bg-transparent"
            }`}
            style={{
              color: pathname === "/Countries" ? " #285060" : "#ffffff",
            }}
          >
            دولية
          </Link>
          <Link
            href="/continents"
            className={`country-list-links mx-2 ${
              pathname === "/continents" ? "active" : ""
            }`}
          >
            قارية
          </Link>
          <Link
            href=""
            className={`country-list-links mx-2 ${
              pathname === "/global" ? "active" : ""
            }`}
            style={{
              color: pathname === "/global" ? " #285060" : "#ffffff",
            }}
          >
            عالمية
          </Link>
        </ul>
      </div>
      <div className="px-5">
        <div className="row gy-4">
          {countries?.map((country) => {
            return (
              <div key={country.country_code} className="col-md-3">
                <div className="bg-white shadow-sm text-center">
                  <Link href={`/continents/${country.country_code}`}>
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div className="country-flag d-flex justify-content-center align-items-center">
                        <Image
                          src={country.image}
                          width={60}
                          height={40}
                          loading="lazy"
                          alt="img-country"
                        />
                        <p className="text-black mb-0 ms-lg-4 px-lg-3 countryname">
                          {" "}
                          {country.title}
                        </p>
                      </div>
                      <Image src={arrow} width={20} height={20} alt="arrow" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
