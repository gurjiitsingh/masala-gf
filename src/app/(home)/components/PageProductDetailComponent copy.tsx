"use client";
// import { fetchProductByBaseProductId } from "@/app/(universal)/action/productsaddon/dbOperation";
// import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import React, { useEffect, useState } from "react";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import CartButton from "@/components/AddToCart/CartButton";
import AddOn from "@/components/level-1/AddOn";
import { formatCurrencyNumber } from '@/utils/formatCurrency';
import { UseSiteContext } from "@/SiteContext/SiteContext";

export default function PageProductDetailComponent({
  product,
  allAddOns,
}: {
  product: ProductType;
  allAddOns: addOnType[];
}) {

  
  const [addOnData, setAddOnData] = useState<addOnType[]>([]);
  const { productCategoryIdG, settings } = UseSiteContext();
 
  useEffect(() => {
    if (allAddOns.length !== 0 && product.flavors) {
      const AddOnData = allAddOns.filter(
        (item: addOnType) => product.id === item.baseProductId
      );
      AddOnData.sort((a: addOnType, b: addOnType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    setAddOnData(AddOnData);
    }
  }, [product.id, allAddOns, product.flavors]);

  //common code start
  // const priceRegular = product.price?.toString().replace (/\./g, ",") ?? "0,00";
  
  const priceRegular = formatCurrencyNumber(
    Number(product.price) ?? 0,
    (settings.currency || 'EUR') as string,
    (settings.locale || 'de-DE') as string
  );


  let priceDiscounted;
  let priceTarget = product.price ?? 0;
  if (product.discountPrice && product.discountPrice > 0) {
    priceTarget = product.discountPrice;
    //priceDiscounted = product.discountPrice.toString().replace (/\./g, ",");
    priceDiscounted = formatCurrencyNumber(
    Number(product.discountPrice) ?? 0,
    (settings.currency || 'EUR') as string,
    (settings.locale || 'de-DE') as string
  );
  }

  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    price: priceTarget,
    name: product.name,
    image: product.image,
    categoryId: product.categoryId,
    productCat:product.productCat!,
  };

  const isCartDisabled = (() => {    
  if (product.categoryId !== '2vvuGl0pgbvvyEPc7o83') return false;
  const berlinTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" });
  const berlinHour = new Date(berlinTime).getHours();
  return !(berlinHour >= 11 && berlinHour < 16);
})();


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
         
          <button onClick={() => alert(product.productDesc ?? "Keine Beschreibung verfügbar")} className="text-sm text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] max-h-[22px] overflow-hidden">
          {product.productDesc}
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
 {/* {!isCartDisabled ? (
    <CartButton cartProduct={cartProduct} />
  ) : (
    <span className="text-green-700 text-xs whitespace-nowrap">Nicht verfügbar 11–16 Uhr</span>
  )} */}

             {!isCartDisabled ? (
  <CartButton cartProduct={cartProduct} />
) : (
  <div className="relative group">
    <button
     onClick={() => {
      toast("Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas anderes wählen.");
    }}
  
      className="px-1 py-1 rounded-full bg-slate-500 cursor-not-allowed"
    >
      <IoMdAdd size={20} className="text-white" />
    </button>
     <div className="absolute bottom-full left-0 transform -translate-x-[100%] mb-2 w-max max-w-[200px] bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
      Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas anderes wählen.
    </div>
  
  </div>
)}
             

                
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
