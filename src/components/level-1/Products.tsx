"use client";

import React, { useEffect, useState } from "react";

import { fetchAddOnProducts } from "@/app/(universal)/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";

import { UseSiteContext } from "@/SiteContext/SiteContext";
import ProductCard from "../level-2/ProductCard";
import { fetchProducts } from "@/app/(universal)/action/products/dbOperation";

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

  // Fetch and filter products
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedAddOns, fetchedProducts] = await Promise.all([
          fetchAddOnProducts(),
          fetchProducts(),
        ]);

        // ✅ Filter for only published products
        const publishedProducts = fetchedProducts.filter(
          (p) => p.status === "published"
        );

        // ✅ Sort
        const sortedProducts = publishedProducts.sort(
          (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
        );

        setAddOns(fetchedAddOns);
        setAllProductsC(sortedProducts);
        setAllProduct(sortedProducts);

        if (categoryId) {
          const filtered = sortedProducts.filter(
            (p) => p.categoryId === categoryId
          );
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
    const filtered = allProducts.filter((p) => p.categoryId === categoryId);
    setProducts(filtered);
  }, [allProducts, categoryId]);

  // Search filter
  useEffect(() => {
    if (productToSearchQuery === "") return;
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(productToSearchQuery.toLowerCase())
    );
    setProducts(filtered);
  }, [productToSearchQuery]);

  return (
    <div className="container mx-auto flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-2 w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap md:mt-3 gap-3 md:gap-5 w-full">
        {products.map((product, i) => (
          <ProductCard
            key={product.id ?? `${product.name}-${i}`}
            product={product}
            allAddOns={addOns}
          />
        ))}
      </div>
    </div>
  );
}
