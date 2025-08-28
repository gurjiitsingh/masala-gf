"use client";

import { useEffect, useState } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { fetchAddOnProducts } from "@/app/(universal)/action/productsaddon/dbOperation";
import { fetchProducts } from "@/app/(universal)/action/products/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import dynamic from "next/dynamic";
// Pick card based on .env
let Card: React.ComponentType<any>;
const cardType = process.env.NEXT_PUBLIC_PRODUCT_CARD_TYPE;
switch (cardType) {
    case "3":
    Card = dynamic(() => import("../level-2/ProductCard-v3")); // horizontal
    break;
  case "2":
    Card = dynamic(() => import("../level-2/ProductCard-v2")); // horizontal
    break;
  default:
    Card = dynamic(() => import("../level-2/ProductCard-h1")); // vertical
}
export default function Products() {
  const { productCategoryIdG, settings, setAllProduct, productToSearchQuery } =
    UseSiteContext();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [allProducts, setAllProductsC] = useState<ProductType[]>([]);
  const [addOns, setAddOns] = useState<addOnType[]>([]);
  const [categoryId, setCategoryId] = useState("");

  // Set initial category
  useEffect(() => {
    const fallbackCategory = settings.display_category as string;
    setCategoryId(productCategoryIdG || fallbackCategory || "");
  }, [settings, productCategoryIdG]);

  // Fetch & filter
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedAddOns, fetchedProducts] = await Promise.all([
          fetchAddOnProducts(),
          fetchProducts(),
        ]);

        const published = fetchedProducts.filter((p) => p.status === "published");
        const sorted = published.sort(
          (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        );

        setAddOns(fetchedAddOns);
        setAllProductsC(sorted);
        setAllProduct(sorted);

        if (categoryId) {
          const filtered = sorted.filter((p) => p.categoryId === categoryId);
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, [categoryId]);

  // Update on category change
  useEffect(() => {
    if (!categoryId || allProducts.length === 0) return;
    setProducts(allProducts.filter((p) => p.categoryId === categoryId));
  }, [allProducts, categoryId]);

  // Search
  useEffect(() => {
    if (productToSearchQuery === "") return;
    setProducts(
      allProducts.filter((p) =>
        p.name.toLowerCase().includes(productToSearchQuery.toLowerCase())
      )
    );
  }, [productToSearchQuery]);

  // ✅ Conditional container classes
  // const containerClass =
  //   cardType === "3"
  //     ? "flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-5"
  //     : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5";


      // ✅ Conditional container classes
let containerClass = "";

switch (cardType) {
  case "2":
    // Horizontal cards
    containerClass =
      //"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5";
       "flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-5 justify-center";
    break;

  case "3":
    // Grid with 2/3/4 columns
    containerClass =
     // "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5";
      "flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-5  justify-center";
    break;

  default:
    // Single column (stacked cards)
    containerClass =
      "flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-5";
    break;
}


  return (
    <div className="container mx-auto w-full ">
      <div className={containerClass}>
        {products.map((product, i) => (
          <Card
            key={product.id ?? `${product.name}-${i}`}
            product={product}
            allAddOns={addOns}
          />
        ))}
      </div>
    </div>
  );
}
