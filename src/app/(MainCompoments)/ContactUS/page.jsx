import React from "react";
import "./ContactUS.css"

export default function ContactUS() {
  return (
    <div className="ContactUS position-relative py-5">
      <div className="position-absolute country-listbeginall w-100">
        <ul className="list-unstyled d-flex justify-content-center align-items-center">
          <li
            className="country-list-links bg-white mx-lg-2"
            style={{ color: "var(--primary-color)" }}
          >
            <span>اتصل بنا</span>
          </li>
        </ul>
      </div>

      <div className="container py-5">
        <div className=" row gy-2">
          <div className=" col-md-4">
            <div className=" bg-white shadow-sm rounded-2 pt-3 pb-4 px-4 ContactUSp">
              <p>تابعنا</p>
              <div>
                
              </div>

            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
