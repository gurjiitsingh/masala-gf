"use client";

import { Suspense } from "react";
import OrderComplete from "./componets/OrderComplete";

 
const Page = () => {
  
 
  return (
   <Suspense>
    <OrderComplete />
   </Suspense>
  );
};

export default Page;
