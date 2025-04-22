'use client'
import { useCartContext } from '@/store/CartContext';


import { cartProductType } from '@/lib/types/cartDataType';

export  function AddToCart({product}:{product:cartProductType}) {
 
 
  const ctx = useCartContext();

   ctx.addProductToCart(product);
 

 
}
