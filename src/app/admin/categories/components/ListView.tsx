"use client";

// type productTableProps = {
//   limit?: number;
//   title?: string;
// };

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";

import TableRows from "./TableRows";
import { fetchCategories } from "@/app/action/category/dbOperations";
import { categoryType } from "@/lib/types/categoryType";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = () => {
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  // var pageNo = 1;
  // var limit = 10

  useEffect(() => {
    async function fetchcate() {
      try {
      
      const categories = await fetchCategories()
       // console.log("---------", categories)
       categories.sort((a, b) => a.sortOrder! - b.sortOrder!);
        setCategoryData(categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchcate();
    
  }, []);

 
  return (
    <>
      <div className="mt-2">
        <h3 className="text-2xl mb-4 font-semibold">
          Categories
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>Product List</TableCaption> */}
            <TableHeader>
              <TableRow>
              <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead className="hidden md:table-cell">
                   Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                   Active
                </TableHead>         
               
                {/* <TableHead>Category</TableHead> */}
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Desc</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
                <TableHead>Related Products</TableHead>
              
               
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData.map((category) => {
                return <TableRows key={category.name} category={category} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;
