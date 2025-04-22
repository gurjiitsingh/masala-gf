"use client";



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
import {  fetchdelivery } from "@/app/action/delivery/dbOperation";
import { deliveryType } from "@/lib/types/deliveryType";
//import FeaturdeliveryUpdate from "./FeaturdeliveryUpdate";

const ListView = () => {

 
  //console.log("delivery addon view ----", id)
  const [deliveryData, setdeliveryData] = useState<deliveryType[]>([]);
  // var pageNo = 1;
  // var limit = 10

  useEffect(() => {
    async function fetchdeliveryL() {
      try {
          const result = await fetchdelivery();
       
        setdeliveryData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdeliveryL();
    
  }, []);


  return (
    <>
      <div className="mt-2">
        <h3 className="text-2xl mb-4 font-semibold">
        deliverys
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>delivery List</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">
                   Zip code
                </TableHead>
                <TableHead className="hidden md:table-cell"> 
                  cost
                </TableHead>
                {/* <TableHead className="hidden md:table-cell">Image</TableHead> */}

                <TableHead>Min spend</TableHead>
                {/* <TableHead>Status</TableHead> */}
                 <TableHead>Distance</TableHead>
                 <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryData?.map((delivery) => {
                return <TableRows key={delivery.id} delivery={delivery} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;
