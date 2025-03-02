"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+966"); // الكود الافتراضي (السعودية)
  const [country, setCountry] = useState("sa"); // الدولة الافتراضية

  const handlePhoneChange = (value, countryData) => {
    // تحديث كود الدولة والعلم عند تغيير الدولة
    setCountry(countryData.countryCode);
    setCountryCode("+" + countryData.dialCode);

    // حذف كود الدولة من الرقم المُدخل وإبقاؤه منفصلًا
    const rawPhoneNumber = value.replace(/^\+\d+/, "");
    setPhoneNumber(rawPhoneNumber);
  };

  return (
    <div className="w-25" style={{ direction: "rtl", textAlign: "right" }}>
      <label
        style={{ fontSize: "16px", marginBottom: "5px", display: "block" }}
      >
         ;vdlرقم الجوال
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* كود الدولة والعلم منفصلين */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img
            src={`https://flagcdn.com/w40/${country}.png`}
            alt="Country Flag"
            style={{ width: "30px", height: "20px" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            {countryCode}
          </span>
        </div>

        {/* إدخال رقم الهاتف بدون كود الدولة */}
        <PhoneInput
          country={country}
          value={phoneNumber}
          onChange={handlePhoneChange}
          disableCountryCode={true} // منع كود الدولة داخل الإدخال
          disableDropdown={false} // السماح بتغيير الدولة
          enableSearch={true} // السماح بالبحث عن الدول
          placeholder="رقم الجوال"
          inputStyle={{
            width: "100%",
            height: "45px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            paddingLeft: "10px",
            direction: "ltr",
          }}
        />
      </div>
    </div>
  );
};

export default CustomPhoneInput;
