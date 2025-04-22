"use client";

import React, { useEffect, useState } from "react";
import { fetchProductAddOnByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
import Productvariant from "./components/productvariant";
import { fetchProductById } from "@/app/action/productsbase/dbOperation";
//import { ButtonAddToCartButton } from "@/components/CartPageComponent/ButtonAddToCart";
import { fetchProductSauces } from "@/app/action/productsauces/dbOperation";
//import Productsauces from "./components/productsauces";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { IoClose } from "react-icons/io5";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
//import { ButtonDecCartProduct } from "../CartPageComponent/ButtonDecCartProduct";
import { useCartContext } from '@/store/CartContext';
import { fetchflavorsProductG } from "@/app/action/flavorsProductG/dbOperation";
import { flavorsProductGType } from "@/lib/types/flavorsProductGType";
import { sauceProductType } from "@/lib/types/productSaucesType";
import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";

//import FeaturProductUpdate from "./FeaturProductUpdate";
type TVariantType = { name: string; price: number };

const ChooseProduct = () => {

  const [productAddOn, setProductAddon] = useState<AddOnProductSchemaType[]>([]);
  const [productBase, setProductBase] = useState<ProductType>();
  const [cartItem, setCartItem] = useState<ProductType | undefined>();
  const [productSauces, setProductSaces] = useState<sauceProductType[]>([]);
  const [ flavorsProductG, setFlavorsProductG] = useState<flavorsProductGType[]>([])
 // const [sauceList, setSauceList] = useState<ProductType[]>([]);
  const [showMessage, setShowMessage ] = useState<boolean>(false);
  const [VariantType, setVariantType] = useState<TVariantType>();
  const [ quantity, setQuantity ] = useState<number>(1);
  //const [ productVariat, setProductVariant ] = useState<string>();
   const { setShowProductDetailM,  baseProductId } =
    UseSiteContext();
    
 

  useEffect(() => {
   // console.log("baseProductId in modal ---- ", baseProductId);
    async function fetchProduct() {
      try {
        const baseProduct = await fetchProductById(baseProductId);
      //  console.log("-------",baseProduct)
        setProductBase(baseProduct);
        setCartItem(baseProduct);
        //console.log("addon product ---------", baseProduct.flavors);
        const productAddon = await fetchProductAddOnByBaseProductId(baseProductId);
        setProductAddon(productAddon);
        const sauces = await fetchProductSauces();
        setProductSaces(sauces);
        if(!productBase?.flavors){
          const flavorsProductG = await fetchflavorsProductG();
          setFlavorsProductG(flavorsProductG);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [baseProductId]);
 

  //let cartProduct = {} as ProductType;

  // function addExtra({ name, price }: { name: string; price: number }) {
  //   console.log("add extra--------",price,typeof(price))
  //    setVariantType({ name: name, price: price });
  //  }

 
  function itemOrderUpdate() {
    const priceBase = productBase?.price as number;
    const priceVariant = VariantType?.price as number;
  //console.log("joint price-------------",priceBase, typeof(priceBase), priceVariant, typeof(priceVariant))
   
    const finalPrice = parseFloat((priceBase + priceVariant).toFixed(2));

   
    const id = baseProductId + "-" + VariantType?.name;
    const pdesc = productBase?.productCat as string;
    const img = productBase?.image as string;
    const isF = productBase?.isFeatured as boolean;
    const pName = productBase?.name as string;
    const pDesc = VariantType?.name as string;

    // cartProduct = {
    //   id: id,
    //   baseProductId,
    //   productDesc: pDesc,
    //   productCat: pdesc,
    //   image: img,
    //   isFeatured: isF,
    //   name: pName,
    //   price: finalPrice,
    //   purchaseSession: "",
    //   quantity: quantity,
    //   status: "",
    // } as cartProductType;
  //  console.log("final price ----------",finalPrice,typeof(finalPrice))
  //  addProductToCart(cartProduct);
    setVariantType({name:"", price:0});
    setQuantity(1);
    //setCartItem(cartProduct);
  }

let price = "";
  if(productBase?.price){
  const priceBaseProduct = productBase?.price as number;
  price = (priceBaseProduct.toString()).replace(/\./g, ',')  
//console.log("-------this is product vari", productBase)
 }
  return (
    <>
     
      
        <div className="w-screen h-screen backdrop-blur-xs overflow-hidden absolute mt-10 z-50">
          <div className="container w-full md:max-w-[400px] bg-slate-200 rounded-2xl mx-auto flex flex-col  py-5 px-2 ">
            <div className="flex justify-end w-full">
              <div>
                <button
                  className="px-2 py-1 bg-slate-200 rounded-md w-fit"
                  onClick={() => {
                    setShowProductDetailM(false);
                    setVariantType({name:"", price:0});
                    setQuantity(1);
                  }}
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="w-full  bg-white flex flex-row border  rounded-tl-2xl rounded-tr-2xl">
              <div className="rounded-tl-2xl ">
                <img
                  src={productBase?.image}
                  className="w-[150px] rounded-tl-2xl "
                />
              </div>

              <div className="w-full flex flex-col p-3 justify-between ">
                <div className="w-full flex gap-2 justify-between ">
                  <div>{productBase?.name}</div>
                  <div>&euro;{price}</div>
                </div>

              </div>
            </div>
            <> {showMessage && <div className="z-50 text-red-500 w-full text-sm bg-slate-100 rounded-lg p-3">Wähle dein Flavour</div>}</>
            <div className="flex flex-col  flex-wrap ">
              {/* {productBase?.flavors&&productAddOn.map((product, i) => {
                return (
                  <Productvariant
                    key={i}
                    product={product}
                    addExtra={addExtra}
                  />
                );
              })}  */}
              {/* {!productBase?.flavors&&
              
              flavorsProductG.map((product, i) => {
                return (
                  <Productvariant
                    key={i}
                    product={product}
                    addExtra={addExtra}
                  />
                );
              })
              
              } */}
            </div>
          {/*  <div className="w-full flex bg-white font-semibold text-[#222] text-center py-3  px-6">
              Add Sauces
            </div>
             <div className="flex flex-col  flex-wrap ">
              {productSauces.map((product, i) => {
                return (
                     <Productsauces key={i} product={product} />
                );
              })}
            </div> */}
            <div className="w-full   bg-white flex flex-row border  rounded-bl-2xl rounded-br-2xl">
              <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
                <div>
                {quantity > 1?  <button onClick={()=>{setQuantity((quantity)=>quantity-1)}} className='border px-3 py-3 rounded-full bg-blue-500'><IoMdRemove size={20} className="text-white " /></button>:<></> }
                {quantity < 2?  <button  className='border px-3 py-3 rounded-full bg-blue-300'><IoMdRemove size={20} className="text-white " /></button>:<></> }
                </div>
              
                {quantity}
                <div>
                  {VariantType?.name &&  <button onClick={()=>{setQuantity((quantity)=>quantity+1)}} className='border px-3 py-3 rounded-full bg-blue-500'><IoMdAdd size={20} className="text-white "  /></button> }
                  {!VariantType?.name && <button 
                      onClick={()=>{setShowMessage(true)}} className='border px-3 py-3 rounded-full bg-blue-300'><IoMdAdd size={20} className="text-white "  /></button>}
                  </div>

                <button className="px-2 py-1 bg-slate-200 rounded-md w-fit" onClick={()=>{addToCartL()}}>Hinzufügen</button>
               
              </div>
            </div>
          </div>
        </div>
     
    </>
  );


  function addToCartL(){
      if(VariantType?.name){
      setShowProductDetailM(false);
      setShowMessage(false);
      itemOrderUpdate();
    }else{
      setShowMessage(true)
    
    }
  }

};


 // function addSauce(extra: {extra:{state:string,name:string,extraPrice:string}}) {
  //   //TVariantType1

  //   if (extra.state) {
  //     addProductToCart(extra);
  //   } else {
  //     removeCartProduct(extra);
  //   }

  //   // addToSauceListLocal(extra)
  // }

  // function addToSauceListLocal(extra) {
  //   const isItemInCart = sauceList.find((cartItem) => cartItem.id === extra.id); // check if the item is already in the cart
  //   let souceNotFound;
  //   if (isItemInCart === undefined) souceNotFound = false;
  //   else souceNotFound = true;

  //   if (souceNotFound) {
  //     setSauceList(sauceList.filter((cartItem) => cartItem.id !== extra.id));
  //   } else {
  //     setSauceList([
  //       ...sauceList,
  //       {
  //         ...extra,
  //       },
  //     ]);
  //   }
  //   setChange((state) => !state);
  // }


export default ChooseProduct;
