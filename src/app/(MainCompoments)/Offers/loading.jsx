import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingOffers() {
  return (
    <div className=" container  py-5">
      <div className=" row gy-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="col-md-4">
            <div className="offer rounded-3 shadow-sm d-flex justify-content-center  align-items-center">
              <Skeleton height={200} />
              <div className="pt-5 pb-3 d-flex justify-content-center align-items-center">
                <Skeleton width={150} height={40} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
