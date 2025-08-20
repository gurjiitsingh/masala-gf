"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRows from "./TableRows";
import { fetchCategories } from "@/app/(universal)/action/category/dbOperations";
import { ProductType } from "@/lib/types/productType";
import { categoryType } from "@/lib/types/categoryType";
import { useSearchParams } from "next/navigation";
import {
  fetchProductByCategoryId,
  fetchProducts,
} from "@/app/(universal)/action/products/dbOperation";

const ListView = ({ title }: { title?: string }) => {
  const searchParams = useSearchParams();
  const productIdFromQuery = searchParams.get("productId");
  const categoryIdFromQuery = searchParams.get("categoryId") as string;

  const [productData, setProductData] = useState<ProductType[]>([]);
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  const [cateId, setCateId] = useState<string>(categoryIdFromQuery || "");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch categories first
  useEffect(() => {
    async function initCategories() {
      try {
        const categories = await fetchCategories();
        categories.sort((a, b) => a.sortOrder! - b.sortOrder!);
        setCategoryData(categories);

        if (cateId) {
          await loadProducts(cateId);
        } else if (productIdFromQuery) {
          // Fetch all products to find this product's category
          const allProds = await fetchProducts();
          const matched = allProds.find((p) => p.id === productIdFromQuery);
          if (matched?.categoryId) {
            setCateId(matched.categoryId);
            await loadProducts(matched.categoryId);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    initCategories();
  }, []);

  // Function to fetch products for a category
  const loadProducts = async (categoryId: string) => {
    try {
      const prods = await fetchProductByCategoryId(categoryId);
      prods.sort((a, b) => a.sortOrder - b.sortOrder);
      setProductData(prods);
    } catch (error) {
      console.error(error);
    }
  };

  // When category changes
  useEffect(() => {
    if (cateId) {
      loadProducts(cateId);
    } else {
      setProductData([]); // No category selected = empty list
    }
  }, [cateId]);

  // Filter by search
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">
            Select Category
          </label>
          <select
            value={cateId}
            onChange={(e) => {
              setCateId(e.target.value);
              setSearchTerm("");
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select category</option>
            {categoryData.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Product List */}
      <h3 className="text-2xl mb-4 font-semibold">{title || "Products"}</h3>
      <div className="bg-slate-50 rounded-lg p-1">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-zinc-800">
            <TableRow>
              <TableHead className="hidden md:table-cell">Image</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Discount Price
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Desc</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRows
                key={product.id}
                product={product}
                highlight={product.id === productIdFromQuery}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListView;
