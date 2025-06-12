import { UseSiteContext } from "@/SiteContext/SiteContext";
import React from "react";

export default function Pickup({
  pickupDiscountPersent,
  calculatedPickUpDiscount,
}: {
  pickupDiscountPersent: number;
  calculatedPickUpDiscount: number;
}) {
  const { deliveryType } = UseSiteContext();

  return (
    <>
      {deliveryType === "pickup" && pickupDiscountPersent !== 0 && (
        <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
          <div className="text-sm font-semibold py-3 w-full text-left">
            <div>Abholrabatt {pickupDiscountPersent} %</div>
            <p className="text-[10px] text-slate-500 mt-1">
              Nicht auf alle Gerichte anwendbar
            </p>
          </div>
          <div className="flex gap-1">
            - <span>&#8364;</span>{" "}
            <span>
              {calculatedPickUpDiscount.toString().replace(/\./g, ",")}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
