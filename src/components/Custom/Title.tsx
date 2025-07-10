import React from "react";
import { Sour_Gummy } from "next/font/google";
import { TEXT } from "@/config/languages";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Title() {
  return (
    <div className="flex gap-2 my-5">
      <div className="flex items-center">
        <img src="/logo.webp" alt={TEXT.logo_alt} className="h-12 w-auto" />
      </div>
      <div>
        <h1 className={`${sourGummy.className} rounded-2xl text-5xl w-full font-bold text-[#496208]`}>
          <div>
            {TEXT.brand}
            <span className="text-xl font-light pl-1">{TEXT.tag_line}</span>
          </div>
        </h1>
      </div>
    </div> 
  );
}

