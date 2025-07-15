import React from "react";
import { Bebas_Neue } from "next/font/google";
import { useSafeSetting } from "@/hooks/useSafeSetting";
import { useLanguage } from "@/store/LanguageContext";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroText() {
  const { TEXT } = useLanguage();
  const homePageOffer = useSafeSetting("home_page_offer");
  const offerInstruction = useSafeSetting("offer_instruction");

  return (
    <div>
      <div className="flex mt-2 md:mt-0 md:flex-col gap-2">
        <h2 className={`${bebas.className} hero-heading`}>
          {homePageOffer && <>{homePageOffer} </>}
          {offerInstruction && <span className="hero-subtext">{offerInstruction}</span>}
        </h2>

        {TEXT.delivery_note && (
          <div className="hero-delivery-note">
            {TEXT.delivery_note}
          </div>
        )}
      </div>

      {TEXT.home_page_disclaimer && (
        <p className="hero-disclaimer">
          {TEXT.home_page_disclaimer}
        </p>
      )}
    </div>
  );
}
