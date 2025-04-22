"use client";
import React from "react";
import { useCartContext } from "@/store/CartContext";
import { cartProductType } from "@/lib/types/cartDataType";




export const ItemTotal = ({ productId }:{productId:string}) => {
 
const { cartData } =  useCartContext();


// console.log("cart data", cartData);
// console.log("this item data", productId);
 // const total = parseInt(item.quantity) * parseFloat(item.price);
  return (
  <div className="p-3 "> {cartData.map((item:cartProductType)=>{
return item.id === productId ? item?.quantity : <></>
  })}</div>
   
 
  );
};


