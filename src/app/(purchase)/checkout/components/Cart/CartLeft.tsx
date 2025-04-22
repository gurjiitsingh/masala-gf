"use client";
//import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartContext } from "@/store/CartContext";

//import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import CouponDiscForm from "./CouponDiscForm";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import DeliveryCost from "./DeliveryCost";
import Pickup from "./Pickup";
import CouponDisc from "./CouponDisc";
import { cartProductType, orderDataType } from "@/lib/types/cartDataType";
import { createNewOrder } from "@/app/action/orders/dbOperations";
import { useRouter } from "next/navigation";
//import { FaCheckCircle } from 'react-icons/fa';


// function calculateNetPayable(
//   total: number,
//   delivery: number,
//   pickup: number,
//   coupon: number,
//   flat: number
// ): number {
//   return +(total + delivery - pickup - coupon - flat).toFixed(2);
// }


export default function CartLeft() {
  const {
    couponDisc,
    deliveryDis,
    chageDeliveryType,
    deliveryType,
    paymentType,
    newOrderCondition,
    setNewOrderCondition,
    //deliveryCost,
    setDeliveryCost,
  } = UseSiteContext();

  //console.log("newOrderCondition-------------", newOrderCondition)

  const router = useRouter();

  const [addCoupon, setAddCoupon] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [itemTotal, setitemTotal] = useState(0);
  const [itemTotalComa, setitemTotalComa] = useState("");
  // const [payableTotal, setPayableTotal] = useState(0);
  // const [totalDiscountL, setTotalDiscountL] = useState(0);

  const [pickUpDiscountPercentL, setPickUpDiscountPercent] = useState(0);
  const [calculatedPickUpDiscountL, setCalculatedPickUpDiscount] = useState(0);
  const [endTotalComma, setEndTotalComma] = useState("");
  const [deliveryCost, setdeliveryCostL] = useState(0);
  const [calCouponDiscount, setCalCouponDisscount] = useState(0);
  const [flatCouponDiscount, setFlatCouponDisscount] = useState(0);
  const [couponDiscountPercentL, setcouponDiscountPercentL] = useState(0);


  const [disableDeliveryBtn, setDisableDeliveryBtn] = useState(false);
  const [disablePickUpBtn, setDisablePickUpBtn] = useState(false);

  const {
    cartData,
    setEndTotalG,
    setTotalDiscountG,
    endTotalG,
    totalDiscountG,
  } = useCartContext();
  const pickupDiscountPersent = 20;

  useEffect(() => {
    if (cartData && cartData.length > 0) {

       let total = 0;
      cartData.forEach((item: cartProductType) => {
        return (total += item.quantity! * +item.price);
      });
      setitemTotal(parseFloat(total.toFixed(2)));

      const itemTotalS = total.toFixed(2).toString();
      const calculatedComma = itemTotalS.split(".").join(",");
      setitemTotalComa(calculatedComma);
    }
  }, [cartData]);

  //console.log("cal total------", itemTotal);

  useEffect(() => {
   
    if (itemTotal > 0) {
      const total = itemTotal;
      if (deliveryType === "pickup") {
        let pickupDiscount = +total * pickupDiscountPersent/100;
        pickupDiscount = +pickupDiscount.toFixed(2);
      
      setCalculatedPickUpDiscount(+pickupDiscount)
      setdeliveryCostL(0);
        setPickUpDiscountPercent(pickupDiscountPersent);
       
      }

      if (deliveryType === "delivery") {
        if (deliveryDis?.price !== undefined) {
          setdeliveryCostL(+deliveryDis?.price);
          setPickUpDiscountPercent(0);
          setCalculatedPickUpDiscount(0)
        }
      }
    }
    if (deliveryType === "delivery") {
      if (deliveryDis?.minSpend !== undefined) {
         if (deliveryDis?.minSpend >= itemTotal) {
          setNewOrderCondition(false);
        } else {
          setNewOrderCondition(true);
        }
      }
    }
  }, [deliveryType, itemTotal, deliveryDis]);

  useEffect(() => {
    if (itemTotal > 0) {
      if (couponDisc?.price) {
        // console.log("coupondisc, minspend, itemTotal-----------",couponDisc.price,couponDisc.minSpend, itemTotal);
        if (couponDisc.minSpend! <= itemTotal) {
          if (couponDisc.discountType === "flat") {
         
            const price = +couponDisc?.price;
            setCalCouponDisscount(0);
            setFlatCouponDisscount(price);
            setcouponDiscountPercentL(parseFloat(((price / itemTotal) * 100).toFixed(2)));
            
          } else {

            const percent = +couponDisc?.price;
            const totalDis = parseFloat(((itemTotal * percent) / 100).toFixed(2));
            setCalCouponDisscount(totalDis);
            setFlatCouponDisscount(0);
            setcouponDiscountPercentL(percent);

          }
        } else {
          alert(
            `Minmun purchase amount for discount is € ${couponDisc?.minSpend} , Remove coupon or add more item to cart`
          );
        }
      } else {
        setCalCouponDisscount(0);
        setcouponDiscountPercentL(0)
      }
    }
  }, [couponDisc, itemTotal]);

  useEffect(() => {
    const itemTotalSafe = Number(itemTotal) || 0;
    const deliveryCostSafe = Number(deliveryCost) || 0;
    const couponDiscountCalSafe = Number(calCouponDiscount) || 0;
    const flatCouponDiscountSafe = Number(flatCouponDiscount) || 0;
    const couponDiscountPercentSafe = Number(couponDiscountPercentL) || 0;
    const pickUpDiscountPercentSafe = Number(pickUpDiscountPercentL) || 0;
   const calculatedPickUpDiscount = Number(calculatedPickUpDiscountL) || 0;

 
    const netPay = (itemTotalSafe + deliveryCostSafe - calculatedPickUpDiscount - couponDiscountCalSafe - flatCouponDiscountSafe  ).toFixed(2);
    const netDiscount = (couponDiscountPercentSafe + pickUpDiscountPercentSafe).toFixed(2);
  
    const payableTotalSComma = netPay.toString().replace(".", ",");


    
    setDeliveryCost(deliveryCostSafe);
    setEndTotalComma(payableTotalSComma);
    setEndTotalG(parseFloat(netPay));
    setTotalDiscountG(parseFloat(netDiscount));
  }, [deliveryCost, calCouponDiscount, itemTotal, flatCouponDiscount, couponDiscountPercentL, pickUpDiscountPercentL, calculatedPickUpDiscountL]);

 

  useEffect(() => {
    if (deliveryType === "pickup") {
      setDisablePickUpBtn(true);
      setDisableDeliveryBtn(false);
      // console.log("deliveryType---------",deliveryType)
    }
    if (deliveryType === "delivery") {
      setDisablePickUpBtn(false);
      setDisableDeliveryBtn(true);
      // console.log("deliveryType---------",deliveryType)
    }
    if (deliveryType === "") {
      setDisablePickUpBtn(false);
      setDisableDeliveryBtn(false);
      // console.log("deliveryType---------",deliveryType)
    }

   
  }, [deliveryType]);
  console.log("isDisabled---------------", isDisabled);
 

  useEffect(() => {
    if (deliveryType === "delivery") {
      if (deliveryDis?.minSpend !== undefined) {
        if (deliveryDis?.minSpend >= itemTotal) {
          setNewOrderCondition(false);
        } else {
          setNewOrderCondition(true);
        }
      } else {
        setdeliveryCostL(0);
      }

      if (deliveryDis !== undefined && deliveryType === "delivery") {
        //   console.log("dilevery type ---",deliveryType,deliveryDis?.price)
        setdeliveryCostL(+deliveryDis?.price);
      }
    }else{
      setdeliveryCostL(0);  
    }
  }, [deliveryType, deliveryDis?.minSpend]);

  async function proceedToOrder() {
    setIsDisabled(true);
    let canCompleteOrder = true;
    let allReadyAlerted = false;

    // console.log("paymentType------------", paymentType)
    // console.log("deliveryType------------", deliveryType)
    // console.log("deliveryDis minSpend------------", deliveryDis)
    // console.log("newOrderCondition ------------", newOrderCondition)

    if (paymentType === "" || paymentType === undefined) {
      canCompleteOrder = false;

      setIsDisabled(false);
      alert("Select Payment type");
      allReadyAlerted = true;
    }

    if (deliveryType === "delivery" && deliveryDis === undefined) {
      setIsDisabled(false);
      canCompleteOrder = false;

      if (!allReadyAlerted) {
        alert(
          "Wir können an diese Adresse nicht liefern. Bitte wählen Sie Abholung und erhalten Sie 10 % Rabatt"
        );
        allReadyAlerted = true;
      }
    }


    if (couponDisc?.minSpend) {
      if (itemTotal < couponDisc.minSpend!){
       

        setIsDisabled(false);
        canCompleteOrder = false;
        if (!allReadyAlerted) {
          alert(
            `Minimun purchase amount to get discount is € ${couponDisc?.minSpend} , Remove coupon or add more item to cart`
          );
          allReadyAlerted = true;
        }
      }
    }

    let AddressId = "";
    let order_user_Id = "";
    let customer_name = "";

    if (typeof window !== "undefined") {
     
      try {
        AddressId = JSON.parse(localStorage.getItem("customer_address_Id") || "null") || "";
      } catch (e) {
        console.log(e);
        AddressId = "";
      }

      order_user_Id = JSON.parse(localStorage.getItem("order_user_Id") || "");
      customer_name = JSON.parse(localStorage.getItem("customer_name") || "");

      // console.log("address id, useraddress id,  customer name ",AddressId,order_user_Id, customer_name)
    }

  
    if (!newOrderCondition && deliveryType !== "pickup") {
      setIsDisabled(false);
      canCompleteOrder = false;
      if (!allReadyAlerted) {
        const minSpendMessage = `Minimum order amount for delivery is €${deliveryDis?.minSpend}`;
        alert(minSpendMessage);
      }
    }

    // if (deliveryType === "pickup" || deliveryDis !== undefined) {
    if (canCompleteOrder) {
      // let flatDiscount = 0;
      // if (couponDisc?.discountType === "flat" && couponDisc?.price) {
      //   flatDiscount = couponDisc?.price as number;
      // }

    //   const itemTotalSafe = Number(itemTotal) || 0;
    //   const deliveryCostSafe = Number(deliveryCost) || 0;
    //   const couponDiscountCalSafe = Number(calCouponDiscount) || 0;
    //   const flatCouponDiscountSafe = Number(flatCouponDiscount) || 0;
    //   const couponDiscountPercentSafe = Number(couponDiscountPercentL) || 0;
    //   const pickUpDiscountPercentSafe = Number(pickUpDiscountPercentL) || 0;
    //  const calculatedPickUpDiscount = Number(calculatedPickUpDiscountL) || 0;

   

      const purchaseData = {
        userId: order_user_Id, //order_user_Id, //session?.user?.id,
        customerName: customer_name,
        cartData,
        endTotalG: endTotalG,
        totalDiscountG,
        
        addressId: AddressId,
        paymentType,

        itemTotal:itemTotal,
        deliveryCost,
        calculatedPickUpDiscountL,

        flatDiscount:flatCouponDiscount,
        calCouponDiscount,

        couponDiscountPercentL,
        pickUpDiscountPercentL,
        
      } as orderDataType;
      let orderMasterId = "";
      if (cartData.length !== 0) {
        orderMasterId = await createNewOrder(purchaseData);
        // console.log("master id----------",  orderMasterId)
      }
      setIsDisabled(false);

      if (paymentType === "stripe") {
        router.push(`/stripe?orderMasterId=${orderMasterId}`);
      }
      if (paymentType === "paypal") {
        router.push(`/pay?orderMasterId=${orderMasterId}`);
      }
      //console.log("going to complete--------")
      if (paymentType === "cod") {
        // console.log("going to complete")
        router.push(
          `/complete?paymentType=Barzahlung&orderMasterId=${orderMasterId}`
        );
        //  router.push(`/checkout?email=${data.email}&deliverytype=${deliveryType}`)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-slate-50 p-5 h-full w-full gap-7 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b border-slate-200 py-3 w-full uppercase">
            {/* Shopping cart total */}
            {/* Gesamtsumme im Warenkorb */}
            Warenkorb-Summe
          </h2>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex flex-col justify-between gap-4">
            <div className="w-fit">
              <button
                onClick={() => setAddCoupon(!addCoupon)}
                className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Fügen Sie einen Gutschein hinzu </span>
                <span>
                  <FaChevronDown />
                </span>
              </button>
            </div>

            {addCoupon && (
              <>
                <CouponDiscForm />
              </>
            )}
          </div>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between">
            <div className="text-sm font-semibold py-3 w-full text-left">
              Zwischensumme
            </div>
            <div className="flex gap-1">
             {itemTotalComa && <span>&#8364;</span>} <span>{itemTotalComa}</span>
            </div>
          </div>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex  justify-start gap-4">
           <div className="flex flex-col gap-2">
            <div className="h-5 flex justify-center">
                {deliveryType === "pickup" && (
                              <FaCheck className="text-green-300 " size={24} />
                            )}
            </div>
            <div className="w-fit">
              <button
                disabled={disablePickUpBtn}
                onClick={() => chageDeliveryType("pickup")}
                className="flex gap-2  items-center text-sm text-slate-600 bg-green-200 border border-slate-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Abholen </span>
                {/* <span>
                  <FaChevronDown />
                </span> */}
              </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
            <div className="h-5 flex justify-center">
                {deliveryType === "delivery" && (
                              <FaCheck className="text-green-300 " size={24} />
                            )}
            </div>

            <div className="w-fit">
              <button
                disabled={disableDeliveryBtn}
                onClick={() => chageDeliveryType("delivery")}
                className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 border border-slate-50 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Lieferung </span>
                {/* <span>
                  <FaChevronDown />
                </span> */}
              </button>
            </div>
            </div>
          </div>

          <DeliveryCost />

          <Pickup
            total={itemTotal}
            pickupDiscountPersent = {pickUpDiscountPercentL}
           
          />

          <CouponDisc total={itemTotal} />

          {/* <div className="font-semibold border-b border-slate-200 py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Local Pickup (Restaurant)
            </h3>
          </div> */}

          {/* <div className="border-b border-slate-200 py-3 w-full ">
            <h3 className="text-sm font-semibold pt-3 pb-1 w-full text-left">
             
              Flat Rate
            </h3>
            <p className="text-sm  pb-3 w-full text-left"> $4</p>
          </div> */}

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
            <div className="text-md font-semibold py-3 w-full text-left">
              Gesamt
            </div>
            <div className="flex gap-1">
             {endTotalComma && <span>&#8364;</span>}  <span>{endTotalComma}</span>
            </div>
          </div>

          {/* <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span> */}
        </div>
        {/* <div className="text-[1.1rem]">
          <span className="text-xl">Subtotal ({cartData.length} items) </span>{" "}
          :${total}
        </div> */}
        {/* <div className="flex items-center justify-center">
          <Link
            href={{
              pathname: "/checkout",
              //  query:{ userId: session?.user?.id}
            }}
          >
            <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">
              Procces to buy
            </div>
          </Link>
        </div> */}
        {/* disabled={true} */}
        <button
          disabled={isDisabled}
          className="w-[200px] py-1 text-center bg-amber-400  font-bold rounded-xl text-[1.2rem]"
          onClick={() => {
            proceedToOrder();
          }}
        >
          <span className=" text-blue-900">Submit</span>
          <span className=" text-sky-500">Order</span>
        </button>
      </div>
    </div>
  );



  // useEffect(() => { console.log("empty dependeny array--------")},[])

  // useEffect(() => { console.log("dependeny -------- deliveryType")},[deliveryType])
  // useEffect(() => { console.log("dependeny -------- paymentType")},[paymentType])
  // useEffect(() => { console.log("dependeny -------- paymentType,deliveryType")},[paymentType,deliveryType])
}
