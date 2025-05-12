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


export default function CartLeft() {
  const {
    couponDisc,
    deliveryDis,
    chageDeliveryType,
    deliveryType,
    paymentType,
    customerAddressIsComplete,
    //deliveryCost,
    setDeliveryCost,
    disablePickupCatDiscountIds,
    settings
  } = UseSiteContext();

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

  const [orderAmountIsLowForDelivery, seOrderAmountIsLowForDelivery] =
    useState(false);

  const [noOffers, setNoOffers] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filteredCategoryDiscount, setFilteredCategoryDiscount] = useState(0);

  const {
    cartData,
    setEndTotalG,
    setTotalDiscountG,
    endTotalG,
    totalDiscountG,
  } = useCartContext();

  // const pickupDiscountPersent = parseInt(
  //   process.env.NEXT_PUBLIC_PICKUP_DISCOUNT ?? "0",
  //   10
  // );
  

   const [pickupDiscountPersent, setPickupDiscountPersent] = useState(0);

// When settings.pickup_discount updates, update state
useEffect(() => {
  if (settings?.pickup_discount !== undefined) {
    setPickupDiscountPersent(Number(settings.pickup_discount));
  }
}, [settings?.pickup_discount]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      let total = 0;

      cartData.forEach((item: cartProductType) => {
        const quantity = Number(item.quantity) || 0;
        const price = parseFloat(item.price as any) || 0;
        total += quantity * price;
      });

      const roundedTotal = parseFloat(total.toFixed(2));
      setitemTotal(roundedTotal);

      const itemTotalS = roundedTotal.toFixed(2).toString();
      const calculatedComma = itemTotalS.split(".").join(",");
      setitemTotalComa(calculatedComma);
    }
    // only sum of specified categories

    if (cartData && cartData.length > 0) {
      // const pickupDiscountDisabledCategories =
      //   disablePickupCatDiscountIds ?? [];
      let filteredTotal = 0;

      if (disablePickupCatDiscountIds?.length) {
        cartData.forEach((item: cartProductType) => {
          const quantity = Number(item.quantity) || 0;
          const price = parseFloat(item.price as any) || 0;
          const itemTotal = quantity * price;

          if (disablePickupCatDiscountIds.includes(item.categoryId)) {
            filteredTotal += itemTotal;
          }
        });
      }

      const roundedFilteredTotal = parseFloat(filteredTotal.toFixed(2));

      const pickupDiscountAmount = calculateDiscount(
        roundedFilteredTotal,
        pickupDiscountPersent
      );
      setFilteredCategoryDiscount(pickupDiscountAmount);
    }

    function calculateDiscount(
      total: number,
      percent: number | string | undefined | null
    ): number {
      const safeTotal = typeof total === "number" ? total : 0;
      const safePercent = Number(percent);

      if (isNaN(safePercent) || safePercent <= 0) return 0;

      const discount = (safeTotal * safePercent) / 100;
      return parseFloat(discount.toFixed(2));
    }
  }, [cartData,pickupDiscountPersent]);

 

  useEffect(() => {
    if (itemTotal > 0) {
      const total = itemTotal;
      if (deliveryType === "pickup") {
        const pickupDiscount = (+total * pickupDiscountPersent) / 100;
        const pickupDiscount_RemovedCate = (
          Number(pickupDiscount) - filteredCategoryDiscount
        ).toFixed(2);

        setCalculatedPickUpDiscount(+pickupDiscount_RemovedCate);
        setdeliveryCostL(0);
        setPickUpDiscountPercent(pickupDiscountPersent);
      }

      if (deliveryType === "delivery") {
        if (deliveryDis?.price !== undefined) {
          setdeliveryCostL(+deliveryDis?.price);
          setPickUpDiscountPercent(0);
          setCalculatedPickUpDiscount(0);
        }
      }
    }
  }, [deliveryType, itemTotal, deliveryDis,pickupDiscountPersent,filteredCategoryDiscount]);

  useEffect(() => {
    if (itemTotal > 0) {
      if (couponDisc?.price) {
        // console.log("coupondisc, minspend, itemTotal-----------",couponDisc.price,couponDisc.minSpend, itemTotal);
        if (couponDisc.minSpend! <= itemTotal) {
          if (couponDisc.discountType === "flat") {
            const price = +couponDisc?.price;
            setCalCouponDisscount(0);
            setFlatCouponDisscount(price);
            setcouponDiscountPercentL(
              parseFloat(((price / itemTotal) * 100).toFixed(2))
            );
          } else {
            const percent = +couponDisc?.price;
            const totalDis = parseFloat(
              ((itemTotal * percent) / 100).toFixed(2)
            );
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
        setcouponDiscountPercentL(0);
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

    const netPay = (
      itemTotalSafe +
      deliveryCostSafe -
      calculatedPickUpDiscount -
      couponDiscountCalSafe -
      flatCouponDiscountSafe
    ).toFixed(2);
    const netDiscount = (
      couponDiscountPercentSafe + pickUpDiscountPercentSafe
    ).toFixed(2);

    const payableTotalSComma = netPay.toString().replace(".", ",");

    setDeliveryCost(deliveryCostSafe);
    setEndTotalComma(payableTotalSComma);
    setEndTotalG(parseFloat(netPay));
    setTotalDiscountG(parseFloat(netDiscount));
  }, [
    deliveryCost,
    calCouponDiscount,
    itemTotal,
    flatCouponDiscount,
    couponDiscountPercentL,
    pickUpDiscountPercentL,
    calculatedPickUpDiscountL,
  ]);

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
  // console.log("isDisabled---------------", isDisabled);

  useEffect(() => {
    if (deliveryType === "delivery") {
      if (deliveryDis?.minSpend !== undefined) {
        if (deliveryDis?.minSpend >= itemTotal) {
          seOrderAmountIsLowForDelivery(true);
        } else {
          seOrderAmountIsLowForDelivery(false);
        }
      } else {
        setdeliveryCostL(0);
      }

      if (deliveryDis !== undefined && deliveryType === "delivery") {
        //   console.log("dilevery type ---",deliveryType,deliveryDis?.price)
        setdeliveryCostL(+deliveryDis?.price);
      }
    } else {
      setdeliveryCostL(0);
    }
  }, [deliveryType, deliveryDis?.minSpend]);

  async function proceedToOrder() {
    setIsDisabled(true);
    try {
      let canCompleteOrder = false;
      let allReadyAlerted = false;
      //  alert(`Hello, ${deliveryType}`)

      if (paymentType === "" || paymentType === undefined) {
        canCompleteOrder = true;
        alert("Select Payment type");
        allReadyAlerted = true;
        return;
      }

      if (!customerAddressIsComplete) {
        alert("Select Address");
        allReadyAlerted = true;
        return;
      }

      if (deliveryType === "delivery" && deliveryDis === undefined) {
        canCompleteOrder = true;
        if (!allReadyAlerted) {
          alert(
            "Wir können nicht an diese Adresse liefern. Bitte wählen Sie Abholung."
          );
          //We cannot deliver to this address. Please select pickup.
          allReadyAlerted = true;
        }
        return;
      }

      if (couponDisc?.minSpend && itemTotal < couponDisc.minSpend) {
        canCompleteOrder = true;
        if (!allReadyAlerted) {
          alert(
            `Minimun purchase amount to get discount is € ${couponDisc?.minSpend} , Remove coupon or add more item to cart`
          );
          allReadyAlerted = true;
        }
        return;
      }

      if (orderAmountIsLowForDelivery && deliveryType !== "pickup") {
        canCompleteOrder = true;
        if (!allReadyAlerted) {
          alert(
            `Minimum order amount for delivery is € ${deliveryDis?.minSpend}`
          );
          allReadyAlerted = true;
        }
        return;
      }

      if (canCompleteOrder) {
        //  alert(`cancelorder, is canceling order because ${canCompleteOrder}`)
        return;
      } else {
        //  alert(`cancelorder ${canCompleteOrder} , so it not cancle order`)
      }

      const AddressId =
        JSON.parse(localStorage.getItem("customer_address_Id") || "null") || "";
      const order_user_Id = JSON.parse(
        localStorage.getItem("order_user_Id") || ""
      );
      const customer_name = JSON.parse(
        localStorage.getItem("customer_name") || ""
      );

      const customer_email = JSON.parse(
        localStorage.getItem("customer_email") || ""
      );

      const purchaseData = {
        userId: order_user_Id,
        customerName: customer_name,
        email: customer_email,
        cartData,
        endTotalG,
        totalDiscountG,
        addressId: AddressId,
        paymentType,
        itemTotal,
        deliveryCost,
        calculatedPickUpDiscountL,
        flatDiscount: flatCouponDiscount,
        calCouponDiscount,
        couponDiscountPercentL,
        pickUpDiscountPercentL,
        noOffers,
      } as orderDataType;

      if (cartData.length !== 0) {
        //  alert(`cart length is more than 0,order started, ${cartData.length}`)
        const orderMasterId = await createNewOrder(purchaseData);

        if (paymentType === "stripe") {
          router.push(`/stripe?orderMasterId=${orderMasterId}`);
        } else if (paymentType === "paypal") {
          router.push(`/pay?orderMasterId=${orderMasterId}`);
        } else if (paymentType === "cod") {
          router.push(
            `/complete?paymentType=Barzahlung&orderMasterId=${orderMasterId}`
          );
        }
      } else {
        alert(`Cart is empty, add some foods`);
      }
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setIsDisabled(false); //  Always re-enable the button
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
              {itemTotalComa && <span>&#8364;</span>}{" "}
              <span>{itemTotalComa}</span>
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
            pickupDiscountPersent={pickUpDiscountPercentL}
            calculatedPickUpDiscount={calculatedPickUpDiscountL}
          />

          <CouponDisc total={itemTotal} />

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
            <div className="text-md font-semibold py-3 w-full text-left">
              Gesamt
            </div>
            <div className="flex gap-1">
              {endTotalComma && <span>&#8364;</span>}{" "}
              <span>{endTotalComma}</span>
            </div>
          </div>

       
        </div>
       
       
       

      

        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              id="noOffersCheckbox"
              type="checkbox"
              checked={noOffers}
              onChange={(e) => {
                const checked = e.target.checked;
                setNoOffers(checked);
                setShowAlert(checked); // Show alert only when checked
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="noOffersCheckbox">
              Ich möchte keine E-Mails über neue Angebote und Rabatte erhalten.
            </label>
          </div>

          {showAlert && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm border border-yellow-300">
              <p>
                Sie haben gewählt, keine E-Mails über neue Angebote und Rabatte
                zu erhalten. Wenn Sie E-Mails erhalten möchten, deaktivieren Sie
                das Kontrollkästchen.
              </p>
              <p className="mt-1">
                You have selected not to receive emails about new offers and
                discounts. If you want to receive such emails, please uncheck
                the box.
              </p>
            </div>
          )}
        </div>

        <button
          disabled={isDisabled}
          className="w-[200px] py-1 text-center bg-amber-400  font-bold rounded-xl text-[1.2rem] z-50"
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


  }
