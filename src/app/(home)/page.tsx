"use client";

//import Categories from "./Components/Categories";
import Products from "@/components/level-1/Products";
//import CategorySlider from "@/components/level-1/CategorySlider";
import CategorySliderSm2 from "@/components/level-1/CategorySliderSm2";
import { useLanguage } from "@/store/LanguageContext";
import Hero from "@/custom/cus-components/Hero";
import Link from "next/link";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();

  const { lang } = useLanguage();

  if (!lang) {
    return (
      <div className="text-center p-4 text-gray-500">Loading language...</div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen px-3 md:px-0 pb-6 mt-3">
        {/* Foreground Content */}
        <div className="relative z-10">
          <div className="container mx-auto">
            <Hero />

            {/* Order Menu Button */}
            <div className="mt-6">
              <Link
                href="https://eat.allo.restaurant/restaurant/masala-taste-of-india"
                // target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#555] text-white font-semibold text-lg px-6 py-3 rounded-2xl shadow-md hover:bg-[#00796b] transition-all duration-200"
              >
                🍴 Order Menu
              </Link>
            </div>
          </div>

          {/* <CategorySliderSm2 /> */}
          {/* <Products /> */}
        </div>
      </div>
    </>
  );
}
