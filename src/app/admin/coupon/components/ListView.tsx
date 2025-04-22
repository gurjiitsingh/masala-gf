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
import {  fetchcoupon } from "@/app/action/coupon/dbOperation";
import { couponType } from "@/lib/types/couponType";
//import FeaturcouponUpdate from "./FeaturcouponUpdate";

const ListView = () => {

 
  //console.log("coupon addon view ----", id)
  const [couponData, setcouponData] = useState<couponType[]>([]);
  // var pageNo = 1;
  // var limit = 10

  useEffect(() => {
    async function fetchcouponL() {
      try {
          const result = await fetchcoupon();
       
        setcouponData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchcouponL();
    
  }, []);


  return (
    <>
      <div className="mt-2">
      <h3 className="text-2xl mb-4 font-semibold">
        Coupon
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>coupon List</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">
                   Code
                </TableHead>
                <TableHead className="hidden md:table-cell"> 
                  Discount
                </TableHead>
                {/* <TableHead className="hidden md:table-cell">Image</TableHead> */}

                <TableHead>Min spend</TableHead>
                {/* <TableHead>Status</TableHead> */}
               
                 <TableHead>Expiry</TableHead>
                 <TableHead>Date</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
                <TableHead>Desc</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {couponData?.map((coupon) => {
                return <TableRows key={coupon.id} coupon={coupon} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;
