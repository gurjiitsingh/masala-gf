"use client";
import React, { Suspense } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./components/Checkout";

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "EUR",
  intent: "capture",
};

function ProviderWrapper() {
  return (
   
    <PayPalScriptProvider options={initialOptions}>
       <Suspense>
      <Checkout />
      </Suspense>
    </PayPalScriptProvider>
   
  );
}

export default ProviderWrapper;