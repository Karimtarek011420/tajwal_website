import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingOffers() {
  return (
    <div className=" container  py-5">
      <div className=" row gy-4">
        <div className="offer rounded-5 shadow-sm  d-flex justify-content-center align-items-center">
          <Skeleton height={400} />
          <div className="pt-5 pb-3 d-flex justify-content-center align-items-center">
            <Skeleton width={"100%"} height={"80vh"} />
          </div>
        </div>
      </div>
    </div>
  );
}
