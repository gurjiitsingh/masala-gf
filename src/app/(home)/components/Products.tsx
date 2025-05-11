"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/app/action/productsbase/dbOperation";
import { fetchAddOnProducts } from "@/app/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import PageProductDetailComponent from "./PageProductDetailComponent";
import SearchForm from "./SearchForm";
import { UseSiteContext } from "@/SiteContext/SiteContext";

export default function Products() {
  const { productCategoryIdG, settings } = UseSiteContext();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [addOns, setAddOns] = useState<addOnType[]>([]);
  const [categoryId, setCategoryId] = useState("");

  // Set initial category
  useEffect(() => {
    const fallbackCategory = settings.display_category as string;
    setCategoryId(productCategoryIdG || fallbackCategory || "");
  }, [settings, productCategoryIdG]);

  // Fetch and filter products
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedAddOns, fetchedProducts] = await Promise.all([
          fetchAddOnProducts(),
          fetchProducts(),
        ]);

        const sortedProducts = fetchedProducts.sort(
          (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        );

        setAddOns(fetchedAddOns);
        setAllProducts(sortedProducts);

        if (categoryId) {
          const filtered = sortedProducts.filter(p => p.categoryId === categoryId);
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [categoryId]);

  // Update when category or allProducts change
  useEffect(() => {
    if (!categoryId || allProducts.length === 0) return;
    const filtered = allProducts.filter(p => p.categoryId === categoryId);
    setProducts(filtered);
  }, [allProducts, categoryId]);

  // Search filter
  function handleSearchForm(searchText: string) {
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(filtered);
  }

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-2 w-full">
      <div className="flex items-center gap-2 w-full">
        <SearchForm handleSearchForm={handleSearchForm} />
        <div className="flex items-center light-bg rounded-full py-1 px-2 text-sm font-light md:font-normal">
          Gericht suchen oder Kategorie auswählen
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap md:mt-3 gap-1 md:gap-5 w-full">
        {products.map((product, i) => (
          <PageProductDetailComponent
            key={product.id ?? `${product.name}-${i}`}
            product={product}
            allAddOns={addOns}
          />
        ))}
      </div>
    </div>
  );
}
