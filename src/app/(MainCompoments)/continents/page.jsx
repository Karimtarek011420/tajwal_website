"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/assets/images/arrow.svg";
import "./continents.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "@/app/utils/config";
export default function CountryHeader() {
  const [countries, setCountry] = useState(null);
  const [error, setError] = useState(null); // تخزين الخطأ
  const pathname = usePathname(); // الحصول على المسار الحالي

  const getCountry = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/continents`, {
        headers: {
          Accept: "application/json",
        },
      });
      setCountry(data.data); // تعيين البيانات في state
      setError(null);
    } catch (error) {
      setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقًا.");
    }
  };
  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="continentsheader position-relative  py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <Link
            href={"/Countries"}
            className="country-list-links mx-2"
            style={{
              color:
                pathname === "/Countries" ? "var(--primary-color)" : "#ffffff",
            }}
          >
            دولية
          </Link>
          <Link
            href="/continents"
            className="country-list-links mx-2"
            style={{
              color:
                pathname === "/continents" ? "var(--primary-color)" : "#ffffff",
              backgroundColor: "var(--background)",
            }}
          >
            قارية
          </Link>
          <Link
            href="/world"
            className="country-list-links mx-2"
            style={{
              color: pathname === "/world" ? "var(--primary-color)" : "#ffffff",
            }}
          >
            عالمية
          </Link>
        </ul>
      </div>
      <div className="px-3 px-md-4 px-lg-5">
        <div>
          {error && (
            <p
              className="text-danger text-center"
              style={{ minHeight: "30vh" }}
            >
              {error}
            </p>
          )}{" "}
        </div>
        <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-4 pb-3">
          {countries?.map((country) => {
            return (
              <div key={country.country_code} className="col">
                <div className="bg-white shadow-sm text-center rounded-3 p-3">
                  <Link href={`/continents/${country.country_code}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Image
                          src={country.image}
                          width={45}
                          height={30}
                          alt={`علم ${country.title}`}
                          loading="lazy"
                          className="ms-2"
                        />
                        <p className="text-black mb-0 ms-3 countryname">
                          {" "}
                          {country.title}
                        </p>
                      </div>
                      <Image src={arrow} width={11} height={20} alt="السهم" />
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
