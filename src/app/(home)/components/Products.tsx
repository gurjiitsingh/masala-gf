// genaric component

import {
  // fetchProductByCategoryId,
   fetchProducts,
 } from "@/app/action/productsbase/dbOperation";
 import { ProductType } from "@/lib/types/productType";
 import React, { useEffect, useState } from "react";
 import PageProductDetailComponent from "./PageProductDetailComponent";
 import { UseSiteContext } from "@/SiteContext/SiteContext";
 import { fetchAddOnProducts } from "@/app/action/productsaddon/dbOperation";
 import SearchForm from "./SearchForm";
 import { addOnType } from "@/lib/types/addOnType";
 
 export default function Products() {
   const { productCategoryIdG } = UseSiteContext();
   const [products, setProduct] = useState<ProductType[]>([]);
   const [allProducts, setAllProduct] = useState<ProductType[]>([]);
   const [allAddOns, setAllAddOns] = useState<addOnType[]>([]);
 
   useEffect(() => {
     async function fetchInitialData() {
       try {
         const addOns = await fetchAddOnProducts();
         setAllAddOns(addOns);
   
         const productData = await fetchProducts();
         productData.sort((a: ProductType, b: ProductType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
         setAllProduct(productData);
   
         if (!productCategoryIdG) {
           const filtered = productData.filter(
             (item) => item.categoryId === "cyswMDLgMXJ1sLj9ukzU"
           );
           setProduct(filtered);
         }
       } catch (err) {
         console.error("Error fetching product data:", err);
       }
     }
     fetchInitialData();
   }, []);
   
   // Runs every time category changes or products are available
   useEffect(() => {
     if (productCategoryIdG !== "" && allProducts.length > 0) {
       const filtered = allProducts.filter(
         (item) => item.categoryId === productCategoryIdG
       );
       filtered.sort((a: ProductType, b: ProductType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
       setProduct(filtered);
     }
   }, [productCategoryIdG, allProducts]); // depends on both
 
 
   function handleSearchForm(e:string){ 
     
     //console.log("search text-----------", e)
     const searchedProduct = allProducts.filter(item =>
     item.name.toLowerCase().includes(e.toLowerCase())
   );
   setProduct(searchedProduct);
   
   }
   return (
     <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-2 w-full">
       <div className="flex items-center gap-2"><SearchForm handleSearchForm={handleSearchForm} /><div className="flex items-center light-bg rounded-full py-1 px-2 text-sm font-light md:font-normal">Gericht suchen oder Kategorie auswählen</div></div>  
       <div className="flex flex-col md:flex-row md:flex-wrap md:mt-3 gap-1 md:gap-5 w-full">
       {products.map((product, i) => {
         return <PageProductDetailComponent 
         key={product.id ?? `${product.name}-${i}`} 
         allAddOns={allAddOns} product={product} />;
       })}
       </div>
     </div>
   );
 }
 