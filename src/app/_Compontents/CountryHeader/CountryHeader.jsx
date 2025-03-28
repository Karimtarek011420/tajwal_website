import React from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/assets/images/arrow.svg";
import "./countryheader.css";
import axios from "axios";
import { API_BASE_URL } from "@/app/utils/config";
// دالة لجلب البيانات من الـ API
const getCountry = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/countries/home_countries`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.data.slice(0, 12); // جلب أول 12 دولة فقط
  } catch (error) {
    console.error("Error fetching countries:", error);
    return []; // إعادة مصفوفة فارغة في حالة حدوث خطأ
  }
};

export default async function CountryHeader() {
  const countries = await getCountry(); // جلب البيانات على الخادم

  if (!countries.length) {
    return (
      <div className="error-message text-center py-5">
        <p className="text-danger">
          حدث خطأ أثناء جلب البيانات. حاول مجددًا لاحقًا.
        </p>
      </div>
    );
  }

  return (
    <div className="countryheader position-relative py-5">
      {/* قائمة الروابط */}
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links  mx-2"
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

      {/* عرض الدول */}
      <div className="px-3 px-md-4 px-lg-5">
        <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-4">
          {countries.map((country) => (
            <div key={country.country_code} className="col">
              <div className="bg-white shadow-sm text-center rounded-3 p-3">
                <Link href={`/Countries/${country.country_code}`}>
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
      {/* زر عرض جميع الدول */}
      <div className="d-flex justify-content-center align-items-center pt-5">
        <Link href="/Countries" className="countryshow text-white px-5 py-3">
          عرض جميع الدول
        </Link>
      </div>
    </div>
  );
}
