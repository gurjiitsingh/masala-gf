"use client";

type productTableProps = {
  limit?: number;
  title?: string;
};

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  //TableCell,
  TableHead,
  TableHeader,
  TableRow,
  //TableCaption,
} from "@/components/ui/table";


import TableRows from "./TableRows";
import { fetchOrdersMaster } from "@/app/action/orders/dbOperations";
import { orderMasterDataT } from "@/lib/types/orderMasterType";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = ({ title }: productTableProps) => {
  const [orderData, setOrderData] = useState<orderMasterDataT[]>([]);
// var pageNo = 1;
// var limit = 10

  useEffect(() => {
    //async function fetchOrder(): Promise<TOrderProduct>{
    async function fetchOrder(){
      try {
        const result = await fetchOrdersMaster()
        setOrderData(result)
      } catch (error) {
        console.log(error)
      } 
   };
    fetchOrder();
  
  }, []);

  return (
    <>
      <div className="mt-2">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Orders"}
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
        <Table >
          {/* <TableCaption>Product List</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Order No.</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              
              <TableHead>Total</TableHead> 
              <TableHead>Payment Method</TableHead>
              <TableHead>Discount %</TableHead>
              <TableHead>Discount flate</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.map((order) => {
              return (
                <TableRows key={order.id} order={order} />
              );
            })}
          </TableBody>
        </Table></div>
      </div>
    </>
  );
};

export default ListView;


 // Sort posts in dec product based on date
//   const sortedproducts: TProduct[] = [...products].sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   });