"use client";
// import { fetchProductByBaseProductId } from "@/app/(universal)/action/productsaddon/dbOperation";
// import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";
import CartButton from "@/components/Custom/AddToCart/CartButton";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";

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
        (a: addOnType, b: addOnType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      );
      setAddOnData(AddOnData);
    }
  }, [product.id, allAddOns, product.flavors]);

  //common code start
  //const priceRegular = product.price.toString().replace(/\./g, ",");
  const priceRegular = product.price?.toString().replace(/\./g, ",") ?? "0,00";

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
    categoryId: product.categoryId,
    productCat: product.productCat!,
  };

  const isCartDisabled = (() => {
    if (product.categoryId !== "2vvuGl0pgbvvyEPc7o83") return false;
    const berlinTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Berlin",
    });
    const berlinHour = new Date(berlinTime).getHours();
    return !(berlinHour >= 11 && berlinHour < 16);
  })();

  //common code end
  return (
    <div className="w-full     bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center">
    

      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex-col gap-4 justify-between ">
          <div className="w-full flex gap-1 mb-2 justify-between ">
            <div className="flex items-center justify-start text-nowrap font-semibold text-center px-2 py-1  min-w-[180px]  rounded-3xl  text-slate-600">
              {productCategoryIdG !== "" && <>{product.sortOrder}.&nbsp;</>}
              {product.name}
            </div>
          </div>

          {/* <button onClick={() => alert(product.productDesc)}> */}

          <button
            onClick={() =>
              alert(product.productDesc ?? "Keine Beschreibung verfügbar")
            }
            className="flex items-start text-sm px-3  text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] min-h-[70px] overflow-hidden"
          >
            {product.productDesc}
          </button>

          {!product.flavors && (
            <div className="flex text-slate-500 items-center  justify-between pt-1 pl-2 pr-1  rounded-3xl">
              <div>Pack</div>
              {/* common code start */}
              {product.discountPrice !== undefined &&
              product.discountPrice > 0 ? (
                <div className="flex justify-between gap-3 items-center">
                  {" "}
                  <div className="line-through font-semibold">&euro;{priceRegular}</div>{" "}
                  <div className="font-semibold">&euro;{priceDiscounted}</div>
                </div>
              ) : (
                <div className="font-semibold">&euro;{priceRegular}</div>
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
                        toast(
                          "Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas anderes wählen."
                        );
                      }}
                      className="px-1 py-1 rounded-full bg-slate-500 cursor-not-allowed"
                    >
                      <IoMdAdd size={20} className="text-white" />
                    </button>
                    <div className="absolute bottom-full left-0 transform -translate-x-[100%] mb-2 w-max max-w-[200px] bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas
                      anderes wählen.
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


        <div className="rounded-lg bg-slate-100 p-1 flex items-center justify-center w-[120px] h-[120px]   overflow-hidden">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-[110px]  md:h-[110px]"
          />
        )}
      </div>
    </div>
  );
}

//bg-[#FF8989]
//bg-amber-400
