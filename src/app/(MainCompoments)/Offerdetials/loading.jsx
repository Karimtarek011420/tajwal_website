import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingOffers() {
  return (
    <div className=" container  py-5">
      <div className=" row gy-4">
        <div className="offer rounded-5 shadow-sm ">
          <Skeleton height={200} />
          <div className="pt-5 pb-3 d-flex justify-content-center align-items-center">
            <Skeleton width={"60%"} height={"80vh"} />
          </div>
        </div>
      </div>
    </div>
  );
}
