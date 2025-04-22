"use client";

import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useCartContext } from "@/store/CartContext";
import { cartProductType } from "@/lib/types/cartDataType";


const CartButton = ({ cartProduct }: {cartProduct:cartProductType}) => {
 
  const [quantity, setQuantity] = useState<number>(0);
  //const [ productVariat, setProductVariant ] = useState<string>();
  
  const { addProductToCart, removeCartProduct, cartData } = useCartContext();

  function addToCartL() {
     addProductToCart(cartProduct)
    }
  function removeFromCartL(){
    removeCartProduct(cartProduct)
  }  

    useEffect(()=>{
      const  cartQty =  cartData.filter((item: cartProductType) => {
        return item.id === cartProduct?.id;
    })
    setQuantity(cartQty[0]?.quantity)
  //  console.log(cartQty[0]?.quantity)
    },[cartData])

  return (
    <>
      <div className="w-full flex flex-row ">
        <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
          <div>
            {quantity > 0 ? (
              <button
                onClick={() => {
                  removeFromCartL();
                }}
                className="px-1 py-1 rounded-full bg-slate-400"
              >
                <IoMdRemove size={20} className="text-white " />
              </button>
            ) : (
              <></>
            )}
           
          </div>

          {quantity}
          <div>
           
            <button
              onClick={() => {
                addToCartL();
              }}
              className=" px-1 py-1 rounded-full bg-slate-500"
            >
              <IoMdAdd size={20} className="text-white " />
            </button>
            {/* } */}
          </div>
        </div>
      </div>
    </>
  );

  
};

export default CartButton;
