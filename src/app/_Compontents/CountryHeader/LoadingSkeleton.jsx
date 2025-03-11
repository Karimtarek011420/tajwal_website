import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function LoadingSkeleton() {
  return (
    <div className="px-5 py-5">
      <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 gy-4 px-lg-5">
        {Array.from({ length: 12 }).map(
          (
            _,
            index // عدد العناصر يمكن تعديله حسب الحاجة
          ) => (
            <div key={index} className="col">
              <div className="bg-white shadow-sm text-center rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Skeleton width={45} height={30} />
                    <Skeleton
                      width={80}
                      height={20}
                      className="me-2 ms-lg-3 ms-2"
                    />
                  </div>
                  <Skeleton width={15} height={25} />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
