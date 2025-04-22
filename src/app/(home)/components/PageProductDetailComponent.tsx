"use client";
// import { fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
// import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";
import CartButton from "@/components/Custom/AddToCart/CartButton";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";

export default function PageProductDetailComponent({
  product,
  allAddOns,
}: {
  product: ProductType;
  allAddOns: addOnType[];
}) {
  const [addOnData, setAddOnData] = useState<addOnType[]>([]);
  const { productCategoryIdG } = UseSiteContext();
  


  useEffect(() => {
    if (allAddOns.length !== 0 && product.flavors) {
      const AddOnData = allAddOns.filter(
        (item: addOnType) => product.id === item.baseProductId
      );
      AddOnData.sort(
      //  (a: addOnType, b: addOnType) => a.sortOrder! - b.sortOrder!
      (a: addOnType, b: addOnType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );
      setAddOnData(AddOnData);
    }
  }, [product.id, allAddOns, product.flavors]);


  




  //common code start
  //const priceRegular = product.price.toString().replace(/\./g, ",");
  const priceRegular = product.price?.toString().replace(/\./g, ",") ?? "0,00";
 
 
  // let priceDiscounted;
  // let priceTarget = product.price;
  // if (product.discountPrice !== undefined && product.discountPrice > 0) {
  //   priceTarget = product.discountPrice;
  //   priceDiscounted = product.discountPrice.toString().replace(/\./g, ",");
  // }

  let priceDiscounted;
  let priceTarget = product.price ?? 0;
  if (product.discountPrice && product.discountPrice > 0) {
    priceTarget = product.discountPrice;
    priceDiscounted = product.discountPrice.toString().replace(/\./g, ",");
  }



  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    price: priceTarget,
    name: product.name,
    image: product.image,
  };
  //common code end
  return (
    <div className="w-full  lg:w-[48%]   bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center">
      <div className="rounded-full flex items-center justify-center w-[70px] h-[65px]  md:w-[90px]  md:h-[80px]  overflow-hidden">
        
        {product.image && (
  <img src={product.image} alt={product.name} className="h-[65px]  md:h-[85px]" />
)}


      </div>

      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex-col gap-4 justify-between ">
          <div className="w-full flex gap-1 mb-2 justify-between ">
            <div className="flex items-center justify-center text-nowrap text-center px-2 py-1 bg-[#64870d] min-w-[180px]  rounded-3xl  text-white">
              {productCategoryIdG !== "" && <>{product.sortOrder}.&nbsp;</>}
              {product.name}
            </div>
          </div>

          {/* <button onClick={() => alert(product.productDesc)}> */}
          <button onClick={() => alert(product.productDesc ?? "Keine Beschreibung verfügbar")}>
            <div className="text-sm text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] max-h-[22px] overflow-hidden">
              {product.productDesc}
            </div>
          </button>

          {!product.flavors && (
            <div className="flex text-slate-500 items-center bg-[#FADB5E] justify-between pt-1 pl-2 pr-1  rounded-3xl">
              <div>Pack</div>
              {/* common code start */}
              {product.discountPrice !== undefined &&
              product.discountPrice > 0 ? (
                <div className="flex justify-between gap-3 items-center">
                  {" "}
                  <div className="line-through">&euro;{priceRegular}</div>{" "}
                  <div>&euro;{priceDiscounted}</div>
                </div>
              ) : (
                <div>&euro;{priceRegular}</div>
              )}
              {/* common code end */}
              <div>
                <CartButton cartProduct={cartProduct} />
                {/* <button
                  className="px-1 py-1 bg-slate-400 shadow-emerald-400 shadow-2xl  rounded-full w-fit"
                  onClick={() => {
                    setShowProductDetailM(false);
                  }}
                >
                  <IoMdAdd size={20} className="text-white " />
                </button> */}
              </div>
            </div>
          )}
        </div>

        {product.flavors && (
          <AddOn baseProductName={product.name} addOnData={addOnData} />
        )}
      </div>
    </div>
  );
}

//bg-[#FF8989]
//bg-amber-400
