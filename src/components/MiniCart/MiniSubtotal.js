"use client";

import React, { useContext } from "react";
import CartContext from "@/store/CartContext";
import { useLanguage } from '@/store/LanguageContext';

export const MiniCartSubtotal = () => {
  const { TEXT } = useLanguage();
  const { cartData } = useContext(CartContext);
  //console.log("in the subtoal");
  //console.log(cartData);

  var total = 0;
  if (cartData.length > 0) {
    cartData.forEach((element) => {
      total =
        total +
        parseInt(element.quantity) * parseFloat(element.price).toFixed(2);
    });
  }
  //after discount

  //const discountedPrice = total-(total*0.1)

  return (
    <div className="">
      <div className="w-full flex flex-col gap-3 bg-slate-50  rounded-xl py-3 justify-between mt-5 ">
        <div className="w-full flex gap-3   by-2 p-2 justify-start">
          <div>Total</div>
          <div className=" text-red-600"> &euro;{total.toFixed(2)} </div>
          <div className="text-sm">
           {TEXT.discount_hint_checkout || "See discount at checkout"}
            {/* line-through */}
            {/* &euro;{discountedPrice.toFixed(2)} */}
          </div>
        </div>
      </div>
    </div>
  );
};
