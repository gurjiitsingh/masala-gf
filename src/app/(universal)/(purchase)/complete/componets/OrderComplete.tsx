import CartContext from "@/store/CartContext";
import { createNewOrderFile } from "@/app/(universal)/action/newOrderFile/newfile";
import { useContext, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { updateOrderMaster } from "@/app/(universal)/action/orders/dbOperations";
import { UseSiteContext } from "@/SiteContext/SiteContext";
//import OrderList from './OrderList'
export default function OrderComplete() {
  const searchParams = useSearchParams();
  const PaymentType = searchParams.get("paymentType");
  const Paymentstatus = searchParams.get("status");
  const orderId = searchParams.get("orderMasterId");
  const deliveryType = searchParams.get("deliveryType");
  const customerNote = searchParams.get("customerNote");
  const couponCode = searchParams.get("couponCode");
  const couponDiscount = searchParams.get("couponDiscount");

  const router = useRouter();
  // const { data: session } = useSession();
  const { deliveryCost } = UseSiteContext();
  const { cartData, endTotalG, totalDiscountG, productTotalCost, emptyCart } =
    useContext(CartContext);
  // console.log("total discount--------", totalDiscountG)
  const id = orderId as string;
  //const status = Paymentstatus as string;

  async function updateOrderStatus(status: string) {
    await updateOrderMaster(id, status);
  }

  async function sendOrderConfirmationEmail(email: string) {
    const response = await fetch("/api/order-confirmation-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "New Order Confirmation",
        items: cartData,
        endTotalG,
      }),
    });
    console.log(response);
  }

  // const hasRun = useRef(false);

  async function createOrder() {
    try {
      let address;
      if (typeof window !== "undefined") {
        address = localStorage.getItem("customer_address");
      }
      if (cartData.length) {
        const result = await createNewOrderFile(
          cartData,
          address,
          endTotalG,
          productTotalCost,
          totalDiscountG,
          PaymentType,
          deliveryCost,
          deliveryType,
          customerNote,
          couponCode,
          couponDiscount
        );

        if (address !== undefined && address !== null) {
          const Address = JSON.parse(address);
          const email = Address.email as string;
          //if (hasRun.current) return;
          //hasRun.current = true;
          await sendOrderConfirmationEmail(email);
        }

        if (result === "success") {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("cart_product_data");

            emptyCart();
          }
        }
      }
    } catch (error) {
      console.error("Error in order completion:", error);
      // Optional: show error to user
    }
  }

  useEffect(() => {
    createOrder();
    // if (PaymentType === "Barzahlung") { }
    if (PaymentType === "paypal" && Paymentstatus === "success") {
      updateOrderStatus("Completed");
    }
    if (PaymentType === "paypal" && Paymentstatus === "fail") {
      updateOrderStatus("Payment failed");
    }
    if (PaymentType === "stripe" && Paymentstatus === "success") {
      updateOrderStatus("Completed");
    }
    if (PaymentType === "sptripe" && Paymentstatus === "fail") {
      updateOrderStatus("Payment failed");
    }
  }, []);

  return (
    <div className="container bg-slate-100 mp flex rounded-2xl my-9 flex-col w-[90%] lg:w-[50%] mx-auto">
      <div className="flex flex-col  gap-6 items-center">
        <div className="text-2xl font-semibold text-center ">
          Ihre Bestellung ist abgeschlossen
        </div>

        <div className="text-lg text-center text-slate-500">
          Abholen: 20–25 Minuten
        </div>
        <div />
        <div className="text-lg text-center text-slate-500">
          Lieferzeit: 40–55 Minuten
        </div>
        <div />

        <div>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="min-w-[200px] mt-5 py-1 text-center primary rounded-2xl text-slate-500 text-[1rem]"
          >
            Mehr einkaufen
          </button>
        </div>
        {/* <div className="">

         { purchase_order.map((item) => <OrderList key={item.id} item={item} />) }
         </div> */}
      </div>
    </div>
  );
}
