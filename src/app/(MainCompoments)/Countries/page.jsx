"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../assets/images/arrow.svg";
import "./country.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "@/app/utils/config";
export default function CountryHeader() {
  const [countries, setCountry] = useState(null);
  const pathname = usePathname(); // الحصول على المسار الحالي
  const getCountry = async () => {
    const { data } = await axios.get(
      `${API_BASE_URL}/countries/home_countries`,
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
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <Link
            href={"/Countries"}
            className={`country-list-links mx-2 bg-white ${
              pathname === "/Countries" ? "active1" : "bg-transparent"
            }`}
            style={{
              color: pathname === "/Countries" ? "var(--primary-color)" : "#ffffff",
            }}
          >
            دولية
          </Link>
          <Link
            href="/continents"
            className={`country-list-links mx-2 ${
              pathname === "/continents" ? "active1" : "bg-transparent"
            }`}
            style={{
              color: pathname === "/continents" ? "var(--primary-color)" : "#ffffff",
            }}
          >
            قارية
          </Link>
          <Link
            href="/world"
            className={`country-list-links mx-2 ${
              pathname === "/world" ? "active1" : "bg-transparent"
            }`}
            style={{
              color: pathname === "/world" ? "var(--primary-color)" : "#ffffff",
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
                  <Link href={`/Countries/${country.country_code}`}>
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
