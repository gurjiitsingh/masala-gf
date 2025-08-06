import { UseSiteContext } from "@/SiteContext/SiteContext";
import { useLanguage } from "@/store/LanguageContext";
import React from "react";

export default function DeliveryCost() {
  const { deliveryDis, deliveryType } = UseSiteContext();
  const { TEXT } = useLanguage();

  return (
    <>
      {deliveryType === "delivery" && (
        <div className="font-semibold border-b py-3 w-full flex justify-between items-center">
          <button className="text-sm font-semibold py-3 w-full text-left">
            {TEXT.deliveryCost.title}
          </button>
          {deliveryDis?.price !== undefined && (
            <div className="flex gap-1">
              <span>&#8364;</span> <span>{deliveryDis?.price} </span>
            </div>
          )}
          {deliveryDis?.price === undefined && (
            <div className="flex gap-1 justify-start">
              <span className="text-sm font-extralight text-red-600">
                {TEXT.deliveryCost.addressRequired}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
