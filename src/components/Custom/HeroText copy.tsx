import React from "react";
import { Bebas_Neue } from "next/font/google";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { TEXT } from "@/config/languages";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroText() {
  const { settings } = UseSiteContext();

  const homePageOffer = settings?.home_page_offer || TEXT.home_page_offer;
  const offerInstruction = settings?.offer_instruction || TEXT.offer_instruction;
  const deliveryNote = settings?.delivery_note || TEXT.delivery_note;
  const disclaimer = settings?.disclaimer || TEXT.home_page_disclaimer;

  return (
    <div>
      <div className="flex mt-2 md:mt-0 md:flex-col gap-2">
        <h2 className={`${bebas.className} text-3xl w-fit my-2 text-emerald-900`}>
          {homePageOffer && <>{homePageOffer} </>}
          {offerInstruction && (
            <span className="text-xl">{offerInstruction}</span>
          )}
        </h2>

        {deliveryNote && (
          <div className="p-2 bg-amber-200 text-sky-600 w-fit h-fit font-semibold rounded-xl mb-2">
            {deliveryNote}
          </div>
        )}
      </div>

      {disclaimer && (
        <p className="text-sm text-slate-500">{disclaimer}</p>
      )}
    </div>
  );
}
