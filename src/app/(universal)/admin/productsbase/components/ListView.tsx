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
import { fetchProductByCategoryId, fetchProducts } from "@/app/(universal)/action/productsbase/dbOperation";
import { fetchCategories } from "@/app/(universal)/action/category/dbOperations";
import { ProductType } from "@/lib/types/productType";
import { categoryType } from "@/lib/types/categoryType";
import CategoryComp from "./CategoryComp";

const ListView = ({ title }: { title?: string }) => {
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  const [cateId, setCateId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const categories = await fetchCategories();
        categories.sort((a, b) => a.sortOrder! - b.sortOrder!);
        setCategoryData(categories);

        const allProds = await fetchProducts(); // all products
        allProds.sort((a, b) => a.sortOrder - b.sortOrder);
        setProductData(allProds);
        setAllProducts(allProds);
      } catch (error) {
        console.log(error);
      }
    }

    fetchInitialData();
  }, []);

     async function fetchInitialData1() {
      try {
      
setCateId("");
        const allProds = await fetchProducts(); // all products
        allProds.sort((a, b) => a.sortOrder - b.sortOrder);
        setProductData(allProds);
        setAllProducts(allProds);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        if (cateId === "") {
          setProductData(allProducts); // show all
        } else {
          const filteredProds = await fetchProductByCategoryId(cateId);
          filteredProds.sort((a, b) => a.sortOrder - b.sortOrder);
          setProductData(filteredProds);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductsByCategory();
  }, [cateId]);

  const fetchServiceHandler = (id: string) => {
    setCateId(id);
    setSearchTerm(""); // reset search on category change
  };

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2">
      <h3 className="text-xl mb-4 font-semibold">Select Category</h3>
      <div className="flex flex-wrap gap-3">
          <button
    onClick={() => fetchInitialData1()}
    className={`px-4 py-2 rounded border text-sm font-medium ${
      cateId === "" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
    }`}
  >
    All
  </button>
        {categoryData.map((cate) => (
          <CategoryComp
            name={cate.name}
            id={cate.id}
            key={cate.name}
            cateId={cateId}
            fetchServiceHandler={fetchServiceHandler}
          />
        ))}
      </div>

      <div className="my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
        />
      </div>

      <h3 className="text-2xl mb-4 font-semibold">{title || "Products"}</h3>
      <div className="bg-slate-50 rounded-lg p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Image</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Discount Price</TableHead>
              <TableHead>Desc</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRows key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListView;
