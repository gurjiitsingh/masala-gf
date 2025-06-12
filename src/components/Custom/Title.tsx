import React from "react";
import { Sour_Gummy } from "next/font/google";
import { allText } from "@/lib/constants/alltext";
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Title() {
  return (
    <div className="flex gap-2 my-5">
      <div className="flex items-center">
        <img src="/logo.png" alt="masala Logo" className="h-12 w-auto" />
      </div>
      <div>
        <h1
          className={`${sourGummy.className} rounded-2xl text-5xl w-full font-bold text-[#496208]`}
        >
          <div>
            {allText.brand}
            <span className="text-3xl font-extralight pl-1">{allText.tagline}</span>
          </div>
        </h1>
      </div>
    </div>
  );
}
