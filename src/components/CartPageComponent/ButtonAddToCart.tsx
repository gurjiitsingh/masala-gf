'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { IoMdAdd } from 'react-icons/io';
import { cartProductType } from '@/lib/types/cartDataType';



export  function ButtonAddToCartButton({product}:{product:cartProductType}) {
 
 
  const ctx = useCartContext();

  function addItemToCart(product:cartProductType){
   
   // ctx.addProduct(product);
   ctx.addProductToCart(product);
  }

  return (
    <button onClick={()=>addItemToCart(product)} className='border px-3 py-3 rounded-full bg-blue-500'><IoMdAdd size={20} className="text-white "  /></button>
  )
}
