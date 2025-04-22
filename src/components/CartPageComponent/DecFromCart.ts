'use client'


import { cartProductType } from '@/lib/types/cartDataType';
import { useCartContext } from '@/store/CartContext';


export  function DecFromCart({product}:{product:cartProductType}) {

  const {  removeCartProduct } =  useCartContext();
   
    removeCartProduct(product)
 

}

  
  
  
  