"use client";
import React, { useState, useEffect } from "react";
import "./header.css";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/navigation";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (searchTerm.trim()) {
      router.push(`/Search?query=${encodeURIComponent(searchTerm)}`);
      // setSearchTerm("");
    }
  }, [searchTerm, router]);

  return (
    <>
      <main className="home py-2 pb-5">
        <Navbar />
        <div className="content-center py-5">
          <div>
            <h1 className="text-white text-center">
              ابقى متصلاً <span className="text">اينما كنت</span>
            </h1>
            <p className="text-white text-center">في اكثر من 200 دولة</p>
            <div className="search-bar">
              <button className="search-button" aria-label="Search">
                <i className="fas fa-search"></i>
              </button>
              <input
                type="text"
                placeholder="ابحث"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setSearchTerm("")} // تفريغ الإدخال عند فقدان التركيز
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
