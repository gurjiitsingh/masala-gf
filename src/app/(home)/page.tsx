"use client";

//import Categories from "./Components/Categories";
import Products from "@/components/level-1/Products";
import CategorySlider from "@/components/level-1/CategorySlider";
import { useLanguage } from "@/store/LanguageContext";
import Hero from "@/components/level-1/Hero";

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
      <div className="relative min-h-screen px-3 md:px-0 pb-6 mt-10">
      
        {/* Foreground Content */}
        <div className="relative z-10">
          <div className="container mx-auto">
            <Hero />
          </div>

          <CategorySlider />
          <Products />
        </div>
      </div>
    </>
  );
}
