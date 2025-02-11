"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import arrow from "../../../assets/images/arrow.svg";

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
        "https://api.tajwal.co/api/v1/country/search",
        { key: searchTerm },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then(({ data }) => {
        setResults(data.data || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "حدث خطأ أثناء البحث");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <main className="container py-5">
      <div className="row">
        <span className="text-center  text-body-secondary mb-3">نتائج البحث عن: {searchTerm}</span>
        {loading && <p className="text-white text-body-secondary mb-3 text-center">جاري البحث...</p>}
        {error && <p className="text-red text-center">{error}</p>}
        {results.map((country) => (
          <div key={country.country_code} className="col-md-3">
            <div className="bg-white shadow-sm text-center">
              <Link href={`/Countries/${country.country_code}`}>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <div className="country-flag d-flex justify-content-center align-items-center">
                    <Image
                      src={country.image}
                      width={60}
                      height={40}
                      alt={`علم ${country.title}`}
                      loading="lazy"
                    />
                    <p className="text-black mb-0 ms-lg-4 px-lg-3 countryname">
                      {country.title}
                    </p>
                  </div>
                  <Image src={arrow} width={20} height={20} alt="السهم" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
