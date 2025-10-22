import Link from "next/link";
import React from "react";

export default function LogoCircle() {
  return (
    <div className="flex items-center justify-center mt-[60px]  pt-15 pb-12">
      <div className="flex rounded-bl-full rounded-tl-full rounded-br-xl rounded-tr-2xl   p-3 border-3 border-[#563419]">
        <div className="w-40 h-40 rounded-full bg-[#563419] flex items-center justify-center shadow-lg" data-aos="fade-right">
          <img
            src="/logo-10.webp"
            alt="Logo"
            className="w-30 h-30 object-contain"
          />
        </div>

        <div className="flex flex-col  shadow-md m-2 md:m-3 p-2 md:p-3 justify-between rounded-xl">
          <div className="mt-1 " data-aos="fade-left">
            <Link
              href="https://eat.allo.restaurant/restaurant/masala-taste-of-india"
              // target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-[#563419] text-white font-semibold md:text-lg px-3 py-1 rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200"
            >
              🍴 Order Menu
            </Link>
          </div>
            <div className="mt-1" data-aos="fade-left">
            <Link
              href="/#bf"
              // target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-[#563419] text-white font-semibold text-md md:text-lg px-3 py-1 rounded-lg shadow-md hover:bg-slate-300 transition-all duration-200"
            >
              Buffet & Fingerfood
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
