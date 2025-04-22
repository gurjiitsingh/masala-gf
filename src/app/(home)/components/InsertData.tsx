import CartButton from '@/components/Custom/AddToCart/CartButton'
import { cartProductType } from '@/lib/types/cartDataType'

import { addOnType } from '@/lib/types/addOnType';
import React from 'react'

export default function InsertData({baseProductName,addOnData}:{baseProductName:string,addOnData:addOnType}) {
   const ProductName = baseProductName +" "+ addOnData.name;
    const cartProduct:cartProductType ={
          id:addOnData.id,
          quantity:1,
          price:addOnData.price,
          name:ProductName,
          image:addOnData.image,
        } 
  return (
    <CartButton cartProduct={cartProduct} />
  )
}

