"use client";
import React, { useContext, useEffect } from "react";
import ProductList from "@/components/MiniCart/productList";
import CartContext from "@/store/CartContext";


const MiniCartContent = () => {
  const { cartData } = useContext(CartContext);

  useEffect(() => {
//   console.log("incart content ---------------", cartData);
  }, [cartData]);
  return (
    <div className="flex flex-col gap-1 bg-white  flex-1 ">
      {/* <div className="py-1 px-3 border-b">
        <h1 className=" text-[1.1rem]"></h1>
      </div> */}
      <div><div className='max-h-[400px] overflow-y-auto'>
        {cartData.map((item,i) => {
           return (
           
              <ProductList key={i} item={item} />
           
          );
        })}
        </div>
      </div>
    </div>
  );
};
export default MiniCartContent;


