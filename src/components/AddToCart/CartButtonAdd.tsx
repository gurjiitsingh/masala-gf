"use client";

import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useCartContext } from "@/store/CartContext";
import { cartProductType } from "@/lib/types/cartDataType";

const CartButtonAdd = ({ cartProduct }: { cartProduct: cartProductType }) => {
  const [quantity, setQuantity] = useState<number>(0);
  //const [ productVariat, setProductVariant ] = useState<string>();

  const { addProductToCart, removeCartProduct, cartData } = useCartContext();

  function addToCartL() {
    addProductToCart(cartProduct);
  }
  function removeFromCartL() {
    removeCartProduct(cartProduct);
  }

  useEffect(() => {
    const cartQty = cartData.filter((item: cartProductType) => {
      return item.id === cartProduct?.id;
    });
    setQuantity(cartQty[0]?.quantity);
    //  console.log(cartQty[0]?.quantity)
  }, [cartData]);

  return (
    <>
     
        <div className=" w-full my-2 x-2">
         
            {quantity > 0 ? (
              <div className="flex justify-between rounded-lg gap-2 w-full bg-slate-50 px-1 py-2">
                <button
                  onClick={removeFromCartL}
                  className="px-1 py-1 rounded-lg bg-slate-400 leading-none flex items-center justify-center"
                >
                  {/* flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 */}
                  <IoMdRemove size={16} className="text-white" />
                </button>
                {quantity > 0 ? (
                  <div className="text-slate-900">{quantity}</div>
                ) : (
                  <>0</>
                )}
                <button
                  onClick={addToCartL}
                  className="leading-none px-1 py-1 rounded-lg bg-slate-500  flex items-center justify-center"
                >
                  <IoMdAdd size={16} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={addToCartL}
                className=" w-full px-1 py-2 rounded-lg bg-slate-50 text-slate-600  flex items-center justify-center"
              >
                Add
              </button>
            )}
         

          <div></div>
        </div>
     
    </>
  );
};

export default CartButtonAdd;
