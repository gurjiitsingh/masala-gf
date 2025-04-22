"use client";
import React, { useEffect, useState } from "react";
import {
  fetchOrderMasterById,
  fetchOrderProductsByOrderMasterId,
} from "@/app/action/orders/dbOperations";
import ProductList from "./productList";
import { searchAddressByAddressId } from "@/app/action/address/dbOperations";
import { useSearchParams } from "next/navigation";
import ListHead from "./ListHead";
import { addressResT } from "@/lib/types/addressType";
import { orderProductsT } from "@/lib/types/orderType";
import { orderMasterDataT } from "@/lib/types/orderMasterType";

const OrderDetail = () => {
  const searchParams = useSearchParams();
  // console.log(
  //   "this is ids ---------------",
  //   searchParams.get("addressId"),
  //   searchParams.get("userId")
  // );
  const addressId = searchParams.get("addressId") as string;
  const masterOrderId = searchParams.get("masterId") as string;
  const [orderProducts, setOrderProducts] = useState<orderProductsT[]>([]);
  const [customerAddress, setCustomerAddress] = useState<addressResT>();
  const [orderMasterData, setOrderMasterData] = useState<orderMasterDataT>();

  useEffect(() => {
    async function getOrderProducts() {
      // console.log("maserer id-----------", masterOrderId);
      const orderProductList = await fetchOrderProductsByOrderMasterId(
        masterOrderId
      );
      const addressRes = await searchAddressByAddressId(addressId);
      // console.log("orderProductList ---------", orderProductList);

      setOrderProducts(orderProductList);
      setCustomerAddress(addressRes);

      const orderMaster = await fetchOrderMasterById(masterOrderId);
      setOrderMasterData(orderMaster);
      console.log("master order -------", orderMaster);
    }
    getOrderProducts();
  }, []);

  useEffect(() => {
    // console.log("addre ins use efferxt-----", customerAddress);
  }, [customerAddress]);
  const endTotalG = orderMasterData?.endTotalG;
  const endTotalGS = endTotalG?.toFixed(2).toString().replace(/\./g, ",");

  const itemTotal = orderMasterData?.itemTotal;
  const itemTotalS = itemTotal?.toFixed(2).toString().replace(/\./g, ",");

  return (
    <div className="flex flex-col gap-4 bg-white px-3 flex-1 mb-12">
      <div className="py-5 px-12 border-b">
        <h1 className=" text-[1.7rem]">Order Detail</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex flex-col gap-2 w-full md:w-[33%] rounded-xl border p-4">
          <h2 className="text-2xl "> Order</h2>

          <div className="flex gap-2">
            <div className="font-semibold">Sr. No:</div>{" "}
            <div className="">{orderMasterData?.srno}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-semibold">Date:</div>{" "}
            <div className="">{orderMasterData?.time}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-semibold">Status:</div>{" "}
            <div className="">{orderMasterData?.status}</div>
          </div>


          <div className="flex gap-2">
            <div className="font-semibold">Discount total:</div>{" "}
            <div className="">%{orderMasterData?.totalDiscountG}</div>
          </div>

         
        </div>


        <div className="flex flex-col gap-2 w-full md:w-[33%] rounded-xl border p-4">
          <h2 className="text-2xl "> Calculations</h2>

        

          <div className="flex gap-2">
            <div className="font-semibold">Item total:</div>{" "}
            <div className="">&euro;{itemTotalS}</div>
          </div>

          
          <div className="flex gap-2">
            <div className="font-semibold">Dilevery cost:</div>{" "}
            <div className="">&euro;{orderMasterData?.deliveryCost}</div>
          </div>

          <div className="flex gap-2">
            <div className="font-semibold">Pickup discount:</div>{" "}
            <div className="">
           - &euro;{orderMasterData?.calculatedPickUpDiscountL}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="font-semibold">Coupon Discount Flat:</div>{" "}
            <div className="">- &euro;{orderMasterData?.flatDiscount}</div>
          </div>

          <div className="flex gap-2">
            <div className="font-semibold">Coupon Discount percent:</div>{" "}
            <div className="">- &euro;{orderMasterData?.calCouponDiscount}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-semibold">Subtotal:</div>{" "}
            <div className="">&euro;{endTotalGS}</div>
          </div>



        </div>




        <div className="w-full md:w-[33%] flex flex-col gap-2 rounded-xl border p-4">
          <h2 className="text-2xl "> Address</h2>
          <div className="flex gap-2">
            <div className="font-semibold">Name</div>
            <div className="">
              {customerAddress?.firstName} {customerAddress?.lastName}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="font-semibold">Email</div>
            <div className="">{customerAddress?.email}</div>
          </div>
          <div className="flex gap-2">
            <div className="font-semibold">Phone</div>
            <div className="">{customerAddress?.mobNo}</div>
          </div>
          <div className="">
            <div className=""></div>
            <div className="">
              {customerAddress?.addressLine1} {customerAddress?.addressLine2}
            </div>
          </div>

          <div className="">
            <div className=""></div>
            <div className="">
              {customerAddress?.city}{" "}
              {customerAddress?.state !== undefined ? (
                customerAddress?.state
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="">
            <div className=""></div>
            <div className="">{customerAddress?.zipCode}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">{/* Billing address */}</div>
      </div>
      <div>
        <ListHead />
        {orderProducts.map((item) => {
          return <ProductList key={item.id} item={item} />;
        })}

        {/* <PickUp />
        <ItemsSubtotal />
        <Shipping />
        <OrderTotal />
        <Paid /> */}
      </div>
    </div>
  );
};
export default OrderDetail;
