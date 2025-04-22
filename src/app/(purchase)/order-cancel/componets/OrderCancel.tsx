// import CartContext from "@/store/CartContext";
// import { createNewOrderFile } from "@/app/action/newOrderFile/newfile";
import {  useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { updateOrderMaster } from "@/app/action/orders/dbOperations";
//import { UseSiteContext } from "@/SiteContext/SiteContext";
//import OrderList from './OrderList'
export default function OrderCancel() {
  const searchParams = useSearchParams();
  // const PaymentType = searchParams.get("paymentType");
  // const Paymentstatus = searchParams.get("status");
  const orderId = searchParams.get("orderMasterId");

  const router = useRouter();
 
    const id = orderId as string;
    //const status = Paymentstatus as string;

    async function updateOrderStatus(status:string) {
      await updateOrderMaster(id, status);
    }
  useEffect(() => {
    // if (
    //   PaymentType === "Barzahlung") {
    //   // console.log("cod or paypal payment completed");
    //   createOrder();
    // }
    // if (PaymentType === "paypal" && Paymentstatus === "success") {
    //   // console.log(
    //   //   "paypal payment completed ----------------",
    //   //   PaymentType,
    //   //   Paymentstatus
    //   // );
    //   createOrder();
    //   updateOrderStatus("Completed");
    // }
    // if (PaymentType === "paypal" && Paymentstatus === "fail") {
      updateOrderStatus("Payment canceled");
    //}
  }, []);

  // async function createOrder() {
  //   let address;
  //   if (typeof window !== "undefined") {
  //     address = localStorage.getItem("customer_address");
  //   }
  //   if (cartData.length) {
  //     const result = await createNewOrderFile(
  //       cartData,
  //       address,
  //       endTotalG,
  //       productTotalCost,
  //       totalDiscountG,
  //       PaymentType,
  //       deliveryCost
  //     );

  //     if (result === "success") {
  //       if (typeof window !== "undefined") {
  //         window.localStorage.removeItem("cart_product_data");

  //         emptyCart();
  //       }
  //     }
  //   }
  // }

  return (
    <div className="container bg-slate-100 mp flex rounded-2xl my-9 flex-col w-[90%] lg:w-[50%] mx-auto">
      <div className="flex flex-col  gap-6 items-center">
        <div className="text-2xl font-semibold text-center ">
        Payment Canceled.
        </div>

        <div className="text-md text-center text-slate-500">
     
        </div>
        <div />
        <div className="text-lg text-center text-slate-500">
        
        </div>
        <div />

        <div>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="min-w-[200px] mt-5 py-1 text-center primary rounded-2xl text-slate-500 text-[1rem]"
          >
            Versuchen Sie es erneut
          </button>
        </div>
        {/* <div className="">

         { purchase_order.map((item) => <OrderList key={item.id} item={item} />) }
         </div> */}
      </div>
    </div>
  );
}
