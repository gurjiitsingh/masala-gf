import { UseSiteContext } from "@/SiteContext/SiteContext";
import React from "react";

export default function CouponDisc({ total }: { total: number }) {
  const { couponDisc, deliveryType } = UseSiteContext();

  return (
    <>
      {couponDisc?.discount &&   deliveryType !== 'pickup' &&(
        <>
          {couponDisc?.discountType === "flat" ? (
            <div className="font-semibold border-b py-3 w-full flex justify-between items-center">
              <div className="text-sm font-semibold py-3 w-full text-left">
                Coupon Discount <span>&euro;</span> {couponDisc?.discount} flat
              </div>
              <div className="flex gap-1">
                - <span>&#8364;</span>{" "}
                <span>
                  {(Number(couponDisc?.discount))
                    .toFixed(2)
                    .replace(/\./g, ",")}
                </span>
              </div>
            </div>
          ) : (
            <div className="font-semibold border-b py-3 w-full flex justify-between items-center">
              <div className="text-sm font-semibold py-3 w-full text-left">
                Coupon Discount {couponDisc?.discount}%
              </div>
              <div className="flex gap-1">
                {couponDisc?.discount && <span>- &#8364;</span>}
                <span>
                  {((+total * Number(couponDisc?.discount)) / 100)
                    .toFixed(2)
                    .replace(/\./g, ",")}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
