import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton() {
  return (
    <div className="px-3 px-md-4 px-lg-5 pt-4">
      <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-4">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="col">
            <div className="bg-white shadow-sm text-center">
              <div className="d-flex justify-content-between align-items-center p-3">
                <div className="country-flag d-flex justify-content-center align-items-center">
                  <Skeleton width={60} height={40} />
                  <Skeleton width={80} className="me-2 ms-lg-4 px-lg-3" />
                </div>
                <Skeleton width={20} height={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
