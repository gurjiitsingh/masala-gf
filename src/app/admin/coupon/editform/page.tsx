"use client";

import { Suspense } from "react";
import PageCom from "./PageCom";

const Page = () => {
  
  return (
    <>
    <Suspense>
      <PageCom />
      </Suspense>
    </>
  );
};

export default Page;
