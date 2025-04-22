'use client'
import React from 'react'
import { IoMdRemove } from 'react-icons/io';

import { useCartContext } from '@/store/CartContext';
import { cartProductType } from '@/lib/types/cartDataType';



export  function ButtonDecCartProduct({product}:{product:cartProductType | undefined}) {

  const {  removeCartProduct } =  useCartContext();

  
  
  function decItemFromCart(product:cartProductType | undefined){
    
    removeCartProduct(product)
    //decCartProductAll(product)
  }

  return (
    <button onClick={()=>decItemFromCart(product)} className='border px-3 py-3 rounded-full bg-blue-500'> <IoMdRemove size={20} className="text-white " /></button>
  )
}




// export  function ButtonDecCartProduct({product}) {

 
//   const ctx = useCartContext();

//   function decCartProduct(product){
//     //console.log("ljkklklk", product)
  
//    // ctx.addProduct(product);
//    ctx.decCartProduct(product);
//   }

//   return (
//     <button
//     className=" rounded-sm bg-slate-300 p-1"
//     onClick={decCartProduct.bind(null, product)}
//   >
//     <IoMdRemove />
//   </button>
//   )
// }  
  
  
  
  