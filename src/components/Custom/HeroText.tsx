import React from "react";
import { Bebas_Neue } from "next/font/google";
import { allText } from "@/lib/constants/alltext";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroText() {
  return (
    <div>
      <div className="flex mt-2 md:mt-0 md:flex-col gap-2">
        <h2 className={`${bebas.className} text-3xl w-fit my-2 text-emerald-900`}>
          {allText.title}
        </h2>
        <div className="p-2 bg-amber-200 text-sky-600 w-fit h-fit font-semibold rounded-xl mb-2">
          {allText.deliveryNote}
        </div>
      </div>
      <p className="text-sm text-slate-500">{allText.disclaimer}</p>
    </div>
  );
}
