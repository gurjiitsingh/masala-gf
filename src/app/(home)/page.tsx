"use client";

//import Categories from "./Components/Categories";
import Products from "./components/Products";
import CategorySlider from "./components/CategorySlider";
import SearchForm from "./components/SearchForm";
import HeroText from "@/components/Custom/HeroText";
import Title from "@/components/Custom/Title";
import { useLanguage } from "@/store/LanguageContext";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();

    const { lang } = useLanguage();

  if (!lang) {
    return <div className="text-center p-4 text-gray-500">Loading language...</div>;
  }

  return (
    <>
    
      <div className="relative min-h-screen px-3 md:px-0 pb-6 mt-10">
        {/* Background Layer */}

        {/* Foreground Content */}
        <div className="relative z-10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
               <Title />
                <div className="flex items-center gap-2 w-full">
                  <SearchForm />
                </div>
              </div>
              <div>
                <HeroText />
              </div>
            </div>
          </div>

          <CategorySlider />
          <Products />
        </div>
      </div>
   </>
  );
}
