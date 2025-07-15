"use client";
import React, { useContext } from "react";
import CartContext from "@/store/CartContext";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { formatCurrencyNumber } from '@/utils/formatCurrency';
import { UseSiteContext } from "@/SiteContext/SiteContext";


const ProductList = ({ item }) => {
  const { addProductToCart, decCartProduct, removeCartProduct } =
    useContext(CartContext);
const  { settings } = UseSiteContext();
        
   //   console.log("cart item", item)

  function addProductToCartNew() {
    //console.log("llll")
    const newProductToAdd = { ...item, quantity: 1 };
    addProductToCart(newProductToAdd);
  }


  let total = parseInt(item.quantity) * parseFloat(item.price);
  total = total.toFixed(2);
  //let totalS = total.toString;
 // const totalSComma = total.replace(/\./g, ",");

     const totalSComma = formatCurrencyNumber(
      total ?? 0,
      (settings.currency || 'EUR'),
      (settings.locale || 'de-DE')
    );

  //  const price = item.price.replace(/\./g, ',')

  const priceFloat = parseFloat(item.price).toFixed(2);

 // const priceS = priceFloat.replace(/\./g, ",");

     const priceS = formatCurrencyNumber(
      priceFloat ?? 0,
      (settings.currency || 'EUR'),
      (settings.locale || 'de-DE')
    );

  return (
    <div className="flex flex-row gap-2 bg-amber-300   justify-between  mt-2 rounded-2xl ">
      {/* <div className="min-w-[20%]">
        <div className="w-[100px]">
        
          <Image
            src={item.image}
            width="0"
            height="0"
            sizes="100vw"
            loading="eager" 
            priority={true}
            className="w-full h-[100px] rounded-tl-xl rounded-bl-xl"
            alt={item.name}
          />
        </div>
      </div> */}
      <div className="w-full flex flex-col justify-between gap-2 p-2 ">
        <div className="flex flex-row gap-3  items-start ">
          <div className="text-md w-[87%] flex items-start ">
            {item.name} {item.productDesc}
          </div>

          <div className="text-[1rem] w-[13%] flex items-start justify-end ">
            &euro;{priceS}
          </div>
        </div>
        {/* <div className="text-sm"> {item.productDesc} </div> */}

        <div className="flex flex-row justify-between w-full">
          <div className="flex justify-between items-center gap-2 w-full">
            <div className="flex w-full justify-center items-center gap-4 ">
              <div className=" p-1 text-sm bg-red-600 rounded-full">
                <button
                  onClick={removeCartProduct.bind(null, item)}
                  className=" rounded-sm text-white p-1"
                >
                  Remove
                </button>
              </div>

              <div className="flex justify-center items-center gap-4 ">
                <button
                  className=" p-2 bg-slate-500 text-sm  rounded-full text-white"
                  onClick={decCartProduct.bind(null, item)}
                >
                  <IoMdRemove size={20} />
                </button>
                <div className="text-amber-950 px-3 py-1  shadow-lg rounded-full">
                
                  {item.quantity}
                </div>
                <button
                  //onClick={addProductToCart.bind(null, item)}
                  onClick={addProductToCartNew}
                  className="bg-slate-500 p-2 text-sm  rounded-full text-white"
                >
                  <IoMdAdd size={20} />
                </button>
              </div>

              <div className="w-full flex justify-end   text-sm ">
                &euro;{totalSComma}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
