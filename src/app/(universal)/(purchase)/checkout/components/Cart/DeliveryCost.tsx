import { UseSiteContext } from "@/SiteContext/SiteContext";
import React from "react";

export default function DeliveryCost() {
  const { deliveryDis, deliveryType } = UseSiteContext();
  return (
    <>
      {deliveryType === "delivery" && (
        <div className="font-semibold border-b py-3 w-full flex justify-between items-center">
          <button className="text-sm font-semibold py-3 w-full text-left">
            {/* Versandkosten */}
            Lieferpauschale
          </button>
          {deliveryDis?.price !== undefined && (
            <div className="flex gap-1">
              <span>&#8364;</span> <span>{deliveryDis?.price} </span>
            </div>
          )}
          {deliveryDis?.price === undefined && (
            <div className="flex gap-1 justify-start">
              {/* <span className="text-sm font-extralight">Please enter full address for delivery estimation </span> */}
              <span className="text-sm font-extralight text-red-600">
                Bitte geben Sie die vollständige Adresse und Postleitzahl ein,
                um die Versandkosten zu schätzen{" "}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
