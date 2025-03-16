"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "./search.css";
import arrow from "../../../assets/images/arrow.svg";
import { API_BASE_URL } from "@/app/utils/config";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");

    axios
      .post(
        `${API_BASE_URL}/country/search`,
        { key: searchTerm },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then(({ data }) => {
        if (data.data && data.data.length > 0) {
          setResults(data.data);
        } else {
          setResults([]); // تأكيد أن النتائج فارغة
          setError("لا توجد نتائج بحث");
        }
      })
      .catch(() => {
        setResults([]); // في حال الخطأ، تأكد من أن النتائج فارغة
        setError("لا توجد نتائج بحث");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <main className="countryheader position-relative  py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links mx-2"
            style={{
              color: "var(--primary-color)",
              backgroundColor: "var(--background)",
            }}
          >
            دولية
          </li>
          <Link
            href="/continents"
            className="country-list-links text-white mx-2"
          >
            قارية
          </Link>
          <Link href="/world" className="country-list-links text-white mx-2">
            عالمية
          </Link>
        </ul>
      </div>
      {loading && (
        <p className="text-white text-body-secondary mb-3 text-center">
          جاري البحث...
        </p>
      )}

      {error && !loading && results.length === 0 && (
        <p
          className="text-body-secondary text-center"
          style={{ minHeight: "30vh" }}
        >
          لا توجد نتائج بحث
        </p>
      )}
      <div className="px-3 px-md-4 px-lg-5">
        <div
          className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-4"
          
        >
          {results.map((country) => (
            <div key={country.country_code} className="col">
              <div className="bg-white shadow-sm text-center rounded-3 p-3">
                <Link
                  href={
                    country.type === "local"
                      ? `/Countries/${country.country_code}`
                      : `/continents/${country.country_code}`
                  }
                >
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
                        {country.title}
                      </p>
                    </div>
                    <Image src={arrow} width={11} height={20} alt="السهم" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
