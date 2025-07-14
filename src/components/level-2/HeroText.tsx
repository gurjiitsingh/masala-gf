import React from "react";
import { Bebas_Neue } from "next/font/google";
import { useSafeSetting } from "@/hooks/useSafeSetting"; // ✅ use hook
import { useLanguage } from '@/store/LanguageContext';
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
        <h2 className={`${bebas.className} text-3xl w-fit my-2 text-emerald-900`}>
          {homePageOffer && <>{homePageOffer} </>}
          {offerInstruction && (
            <span className="text-xl">{offerInstruction}</span>
          )}
        </h2>

        {TEXT.delivery_note && (
          <div className="p-2 bg-amber-200 text-sky-600 w-fit h-fit font-semibold rounded-xl mb-2">
            {TEXT.delivery_note}
          </div>
        )}
      </div>

      {TEXT.home_page_disclaimer && (
        <p className="text-sm text-slate-500">{TEXT.home_page_disclaimer}</p>
      )}
    </div>
  );
}
