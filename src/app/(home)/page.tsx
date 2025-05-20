"use client";

import Hero from "./components/Hero";
//import Categories from "./Components/Categories";
import Products from "./components/Products";
import CategorySlider from "./components/CategorySlider";
import SearchForm from "./components/SearchForm";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();

  return (
    <div
      style={{
        backgroundImage: "url('/masala-gf-bg.jpg')",
      }}
      className="px-3 md:px-0 min-h-screen pb-6  z-0 relative bg-cover bg-center bg-no-repeat  "
    >
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
        <h1 className="text-5xl w-full font-bold my-7  text-slate-500">
          {" "}
          Masala <span className="text-4xl font-extralight text-zinc-400">Taste of India</span> 
        </h1>
        <div className="flex items-center gap-2 w-full">
          <SearchForm />
        </div>
        </div>
        <div>
 <h2 className="text-3xl w-full my-4  text-slate-700">
          {" "}
            Abhol Rabatt 20%
        </h2>
        <p className="text-sm text-slate-500">Das Essen kann vom Bild abweichen</p>
     </div></div>
      </div>
 
      <CategorySlider />
      {/* <Categories /> */}

      <Products />
    </div>
  );
}
