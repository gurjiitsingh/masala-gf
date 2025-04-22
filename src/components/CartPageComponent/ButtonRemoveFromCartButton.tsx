'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { cartProductType } from '@/lib/types/cartDataType';


export default function RemoveFromCartButton({product}:{product:cartProductType}) {

 
  const ctx = useCartContext();

  function removeItemToCart(product:cartProductType){
    //console.log("ljkklklk", product)
  
   // ctx.addProduct(product);
   ctx.removeCartProduct(product);
  }

  return (
    <button onClick={()=>removeItemToCart(product)} className='border px-3 py-1 rounded-xl'>-</button>
  )
}
