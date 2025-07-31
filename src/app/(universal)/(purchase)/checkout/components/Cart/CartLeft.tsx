"use client";
import React, { useEffect, useState } from "react";
import { useCartContext } from "@/store/CartContext";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import CouponDiscForm from "./CouponDiscForm";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import DeliveryCost from "./DeliveryCost";
import Pickup from "./Pickup";
import CouponDisc from "./CouponDisc";
import { cartProductType, orderDataType } from "@/lib/types/cartDataType";
import { createNewOrder } from "@/app/(universal)/action/orders/dbOperations";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLanguage } from "@/store/LanguageContext";
import { formatCurrencyNumber } from "@/utils/formatCurrency";

export default function CartLeft() {
  const { TEXT } = useLanguage();
  const {
    couponDisc,
    deliveryDis,
    chageDeliveryType,
    deliveryType,
    paymentType,
    customerAddressIsComplete,
    setDeliveryCost,
    disablePickupCatDiscountIds,
    settings,
  } = UseSiteContext();

  const router = useRouter();

  const [addCoupon, setAddCoupon] = useState(false);
  const [itemTotal, setitemTotal] = useState(0);
  const [itemTotalComa, setitemTotalComa] = useState("");
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
  const [onlyItemsWithDisabledCouponCode, setOnlyItemsWithDisabledCouponCode] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cartData,
    setEndTotalG,
    setTotalDiscountG,
    endTotalG,
    totalDiscountG,
  } = useCartContext();

  const [pickupDiscountPersent, setPickupDiscountPersent] = useState(0);

  useEffect(() => {
    if (settings?.pickup_discount !== undefined) {
      setPickupDiscountPersent(Number(settings.pickup_discount));
    }
  }, [settings?.pickup_discount]);

  useEffect(() => {
    if (!cartData || cartData.length === 0) return;

    let total = 0;
    let filteredTotal = 0;

    cartData.forEach((item: cartProductType) => {
      const quantity = Number(item.quantity) || 0;
      const price = parseFloat(item.price as any) || 0;
      const itemTotal = quantity * price;
      total += itemTotal;

      if (disablePickupCatDiscountIds?.includes(item.categoryId)) {
        filteredTotal += itemTotal;
      }
    });

    const roundedTotal = parseFloat(total.toFixed(2));
    setitemTotal(roundedTotal);

    const roundedTotalCU = formatCurrencyNumber(
      roundedTotal ?? 0,
      (settings.currency || "EUR") as string,
      (settings.locale || "de-DE") as string
    );

    //setitemTotalComa(roundedTotal.toFixed(2).replace(".", ","));
    setitemTotalComa(roundedTotalCU);

    const pickupDiscountAmount = calculateDiscount(
      filteredTotal,
      pickupDiscountPersent
    );
    setFilteredCategoryDiscount(pickupDiscountAmount);

    function calculateDiscount(
      total: number,
      percent: number | string | undefined | null
    ): number {
      const safeTotal = typeof total === "number" ? total : 0;
      const safePercent = Number(percent);
      if (isNaN(safePercent) || safePercent <= 0) return 0;
      return parseFloat(((safeTotal * safePercent) / 100).toFixed(2));
    }
  }, [cartData, pickupDiscountPersent, disablePickupCatDiscountIds]);

  useEffect(() => {
    if (itemTotal <= 0) return;

    if (deliveryType === "pickup") {
      const pickupDiscount =
        ((itemTotal - flatCouponDiscount - calCouponDiscount) *
          pickupDiscountPersent) /
        100;

      const pickupDiscountRemovedCate = (
        pickupDiscount - filteredCategoryDiscount
      ).toFixed(2);

      setCalculatedPickUpDiscount(+pickupDiscountRemovedCate);
      setdeliveryCostL(0);
      if (parseInt(pickupDiscountRemovedCate) === 0) {
        setPickUpDiscountPercent(0);
      } else {
        setPickUpDiscountPercent(pickupDiscountPersent);
      }
    } else if (
      deliveryType === "delivery" &&
      deliveryDis?.price !== undefined
    ) {
      setdeliveryCostL(+deliveryDis.price);
      setPickUpDiscountPercent(0);
      setCalculatedPickUpDiscount(0);
    }
  }, [
    deliveryType,
    itemTotal,
    deliveryDis,
    pickupDiscountPersent,
    filteredCategoryDiscount,
    flatCouponDiscount,
    calCouponDiscount,
  ]);

  useEffect(() => {
    if (itemTotal <= 0) return;
    // console.log("applyDelivery, applyPickup-------", couponDisc?.applyDelivery,couponDisc?.applyPickup)

    if (deliveryType === "pickup" && !couponDisc?.applyPickup) {
      setCalCouponDisscount(0);
      setFlatCouponDisscount(0);
      return;
    }

    if (deliveryType === "delivery" && !couponDisc?.applyDelivery) {
      setCalCouponDisscount(0);
      setFlatCouponDisscount(0);
      return;
    }

    if (couponDisc?.discount && couponDisc.minSpend! <= itemTotal) {
      const excludedCategoryIds = couponDisc.excludedCategoryIds || [];
      const isCouponAllowed = cartData.some(
        (item) => !excludedCategoryIds.includes(item.categoryId)
      );
      setOnlyItemsWithDisabledCouponCode(isCouponAllowed);

      if (isCouponAllowed) {
        if (couponDisc.discountType === "flat") {
          const price = +couponDisc.discount;
          setCalCouponDisscount(0);
          setFlatCouponDisscount(price);
          setcouponDiscountPercentL(
            parseFloat(((price / itemTotal) * 100).toFixed(2))
          );
        } else {
          const percent = +couponDisc.discount;
          const totalDis = parseFloat(((itemTotal * percent) / 100).toFixed(2));
          setCalCouponDisscount(totalDis);
          setFlatCouponDisscount(0);
          setcouponDiscountPercentL(percent);
        }
      }
    } else if (couponDisc?.discount) {
      toast.error(
        `Minmun purchase amount for discount is € ${couponDisc.minSpend} , Remove coupon or add more item to cart`
      );
    } else {
      setCalCouponDisscount(0);
      setcouponDiscountPercentL(0);
    }
  }, [couponDisc, itemTotal, cartData, deliveryType]);

  useEffect(() => {
    const netPay = (
      itemTotal +
      deliveryCost -
      calculatedPickUpDiscountL -
      calCouponDiscount -
      flatCouponDiscount
    ).toFixed(2);

    const netDiscount = (
      couponDiscountPercentL + pickUpDiscountPercentL
    ).toFixed(2);

    setDeliveryCost(deliveryCost);

    const netPayCU = formatCurrencyNumber(
      Number(netPay) ?? 0,
      (settings.currency || "EUR") as string,
      (settings.locale || "de-DE") as string
    );

    setEndTotalComma(netPayCU);
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
    setDisablePickUpBtn(deliveryType === "pickup");
    setDisableDeliveryBtn(deliveryType === "delivery");
  }, [deliveryType]);

  useEffect(() => {
    if (deliveryType === "delivery") {
      if (
        deliveryDis?.minSpend !== undefined &&
        deliveryDis.minSpend >= itemTotal
      ) {
        seOrderAmountIsLowForDelivery(true);
      } else {
        seOrderAmountIsLowForDelivery(false);
      }

      if (deliveryDis?.price !== undefined) {
        setdeliveryCostL(+deliveryDis.price);
      }
    } else {
      setdeliveryCostL(0);
    }
  }, [deliveryType, deliveryDis?.minSpend, itemTotal, deliveryDis?.price]);

  async function proceedToOrder() {
    setIsLoading(true);
    try {
      let canCompleteOrder = false;
      let allReadyAlerted = false;
      //  toast.error(`Hello, ${deliveryType}`)

      if (paymentType === "" || paymentType === undefined) {
        canCompleteOrder = true;
       toast.error(TEXT.error_select_payment_type);

        allReadyAlerted = true;
        return;
      }

      if (!customerAddressIsComplete) {
        toast.error(TEXT.error_select_address);
        allReadyAlerted = true;
        return;
      }

      // if (
      //   deliveryType === "delivery" &&
      //   (!deliveryDis || deliveryDis.price === undefined)
      // ) {
      //   canCompleteOrder = true;

      //   if (deliveryDis && !isNaN(Number(deliveryDis.price))) {
      //     const cost = Number(deliveryDis.price);
      //     setdeliveryCostL(cost);
      //   }

      //   if (!allReadyAlerted) {
      //     toast.error(
      //       "Wir können nicht an diese Adresse liefern. Bitte wählen Sie Abholung."
      //     );
      //     allReadyAlerted = true;
      //   }

      //   return;
      // }

      if (
        deliveryType === "delivery" &&
        (!deliveryDis || deliveryDis.price === undefined)
      ) {
        canCompleteOrder = true;

        if (!allReadyAlerted) {
         toast.error(TEXT.error_address_not_deliverable);
          allReadyAlerted = true;
        }

        return;
      }

      // if (deliveryType === "delivery" && deliveryDis?.price !== undefined) {
      //   const cost = Number(deliveryDis.price);
      //   if (!isNaN(cost)) {
      //     setdeliveryCostL(cost);
      //   } else {
      //     console.warn("Delivery price is invalid", deliveryDis.price);
      //     setdeliveryCostL(0); // Safe fallback
      //   }
      // }

      if (couponDisc?.minSpend && itemTotal < couponDisc.minSpend) {
        canCompleteOrder = true;
        if (!allReadyAlerted) {
          toast.error(`${TEXT.error_min_purchase_coupon} : ${couponDisc?.minSpend} ${TEXT.error_min_purchase_suffix}`);

          allReadyAlerted = true;
        }
        return;
      }

      if (orderAmountIsLowForDelivery && deliveryType !== "pickup") {
        canCompleteOrder = true;
        if (!allReadyAlerted) {
          toast.error(`${TEXT.error_min_order_delivery} € ${deliveryDis?.minSpend}`);

          allReadyAlerted = true;
        }
        return;
      }

      if (canCompleteOrder) {
        //  toast.error(`cancelorder, is canceling order because ${canCompleteOrder}`)
        return;
      } else {
        //  toast.error(`cancelorder ${canCompleteOrder} , so it not cancle order`)
      }

      const AddressId =
        JSON.parse(localStorage.getItem("customer_address_Id") || "null") || "";
      // const order_user_Id = JSON.parse(
      //   localStorage.getItem("order_user_Id") || ""
      // );
      const order_user_Id = localStorage.getItem("order_user_Id") ?? null;
      const customer_name = JSON.parse(
        localStorage.getItem("customer_name") || ""
      );

      const customer_email = JSON.parse(
        localStorage.getItem("customer_email") || ""
      );
      const couponCode = "KJKKS"; // couponDisc?.code?.trim() ? couponDisc.code : "NA";

      if (typeof deliveryCost !== "number" || Number.isNaN(deliveryCost)) {
       toast.error(TEXT.error_unexpected_total);

        return;
      }

      if (typeof endTotalG !== "number" || Number.isNaN(endTotalG)) {
        toast.error(TEXT.error_unexpected_total);

        return;
      }

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
        couponCode: couponDisc?.code?.trim() ? couponDisc.code : "NA", //couponCode: couponDisc?.code ?? "NA",
        pickUpDiscountPercentL,
        noOffers,
      } as orderDataType;

      if (cartData.length !== 0) {
        //  toast.error(`cart length is more than 0,order started, ${cartData.length}`)
        const orderMasterId = await createNewOrder(purchaseData);

        if (paymentType === "stripe") {
          router.push(
            `/stripe?orderMasterId=${orderMasterId}&deliveryType=${deliveryType}&customerNote=${"this is cusomer note"}&couponCode=${couponCode}&couponDiscount=${calCouponDiscount}`
          );
        } else if (paymentType === "paypal") {
          router.push(
            `/pay?orderMasterId=${orderMasterId}&deliveryType=${deliveryType}&customerNote=${"this is cusomer note"}&couponCode=${couponCode}&couponDiscount=${calCouponDiscount}`
          );
        } else if (paymentType === "cod") {
          router.push(
            `/complete?paymentType=Barzahlung&orderMasterId=${orderMasterId}&deliveryType=${deliveryType}&customerNote=${"this is cusomer note"}&couponCode=${couponCode}&couponDiscount=${calCouponDiscount}`
          );
        }
      } else {
       toast.error(TEXT.error_empty_cart);

      }
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      //  Always re-enable the button
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-slate-50 p-5 h-full w-full gap-7 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b border-slate-200 py-3 w-full uppercase">
            {TEXT.cart_heading}
          </h2>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex flex-col justify-between gap-4">
            <div className="w-fit">
              <button
                onClick={() => setAddCoupon(!addCoupon)}
                className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>{TEXT.add_coupon_button}</span>
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
              {TEXT.subtotal_label}
            </div>
            <div className="flex gap-1">
              {itemTotalComa && <span> </span>} <span>{itemTotalComa}</span>
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
                  <span>{TEXT.pickup_button}</span>
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
                  <span>{TEXT.delivery_button}</span>
                </button>
              </div>
            </div>
          </div>

          <DeliveryCost />

          <Pickup
            pickupDiscountPersent={pickUpDiscountPercentL}
            calculatedPickUpDiscount={calculatedPickUpDiscountL}
          />

          {onlyItemsWithDisabledCouponCode &&
            flatCouponDiscount + calCouponDiscount !== 0 && (
              <CouponDisc total={itemTotal} />
            )}

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
            <div className="text-md font-semibold py-3 w-full text-left">
              {TEXT.total_label}
            </div>
            <div className="flex gap-1">
              {endTotalComma && <span></span>} <span>{endTotalComma}</span>
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
                setShowAlert(checked);
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="noOffersCheckbox">{TEXT.no_offers_checkbox}</label>
          </div>

          {showAlert && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm border border-yellow-300">
              <p>{TEXT.no_offers_alert_line1}</p>
              <p className="mt-1">{TEXT.no_offers_alert_line2}</p>
            </div>
          )}
        </div>

        <button
          onClick={proceedToOrder}
          disabled={isLoading}
          className="w-full px-4 py-2 font-bold rounded-xl text-[1.2rem] bg-amber-400 text-blue-900 hover:bg-amber-500 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {isLoading ? (
            TEXT.placing_order_text
          ) : (
            <>
              {TEXT.place_order_button}
              <span className="text-sky-500">{TEXT.order_button_suffix}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-4 w-full ">
  //     <div className="flex flex-col bg-slate-50 p-5 h-full w-full gap-7 rounded-2xl">
  //       <div className="flex flex-col gap-2 items-center">
  //         <h2 className="text-xl font-semibold border-b border-slate-200 py-3 w-full uppercase">
  //           {/* Shopping cart total */}
  //           {/* Gesamtsumme im Warenkorb */}
  //           Warenkorb-Summe.
  //         </h2>

  //         <div className="font-semibold border-b border-slate-200 py-3 w-full flex flex-col justify-between gap-4">
  //           <div className="w-fit">
  //             <button
  //               onClick={() => setAddCoupon(!addCoupon)}
  //               className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
  //             >
  //               <span>Fügen Sie einen Gutschein hinzu </span>
  //               <span>
  //                 <FaChevronDown />
  //               </span>
  //             </button>
  //           </div>

  //           {addCoupon && (
  //             <>
  //               <CouponDiscForm />
  //             </>
  //           )}
  //         </div>

  //         <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between">
  //           <div className="text-sm font-semibold py-3 w-full text-left">
  //             Zwischensumme
  //           </div>
  //           <div className="flex gap-1">
  //             {itemTotalComa && <span>&#8364;</span>}{" "}
  //             <span>{itemTotalComa}</span>
  //           </div>
  //         </div>

  //         <div className="font-semibold border-b border-slate-200 py-3 w-full flex  justify-start gap-4">
  //           <div className="flex flex-col gap-2">
  //             <div className="h-5 flex justify-center">
  //               {deliveryType === "pickup" && (
  //                 <FaCheck className="text-green-300 " size={24} />
  //               )}
  //             </div>
  //             <div className="w-fit">
  //               <button
  //                 disabled={disablePickUpBtn}
  //                 onClick={() => chageDeliveryType("pickup")}
  //                 className="flex gap-2  items-center text-sm text-slate-600 bg-green-200 border border-slate-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
  //               >
  //                 <span>Abholen </span>
  //                 {/* <span>
  //                 <FaChevronDown />
  //               </span> */}
  //               </button>
  //             </div>
  //           </div>
  //           <div className="flex flex-col gap-2">
  //             <div className="h-5 flex justify-center">
  //               {deliveryType === "delivery" && (
  //                 <FaCheck className="text-green-300 " size={24} />
  //               )}
  //             </div>

  //             <div className="w-fit">
  //               <button
  //                 disabled={disableDeliveryBtn}
  //                 onClick={() => chageDeliveryType("delivery")}
  //                 className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 border border-slate-50 rounded-2xl px-3 font-semibold py-1 w-full text-left "
  //               >
  //                 <span>Lieferung </span>
  //                 {/* <span>
  //                 <FaChevronDown />
  //               </span> */}
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <DeliveryCost />

  //         <Pickup
  //           pickupDiscountPersent={pickUpDiscountPercentL}
  //           calculatedPickUpDiscount={calculatedPickUpDiscountL}
  //         />

  //         {onlyItemsWithDisabledCouponCode && (flatCouponDiscount+calCouponDiscount) !== 0 && <CouponDisc total={itemTotal} />}

  //         <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
  //           <div className="text-md font-semibold py-3 w-full text-left">
  //             Gesamt
  //           </div>
  //           <div className="flex gap-1">
  //             {endTotalComma && <span>&#8364;</span>}{" "}
  //             <span>{endTotalComma}</span>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="flex flex-col gap-2">
  //         <div className="flex items-center space-x-2 text-sm text-gray-700">
  //           <input
  //             id="noOffersCheckbox"
  //             type="checkbox"
  //             checked={noOffers}
  //             onChange={(e) => {
  //               const checked = e.target.checked;
  //               setNoOffers(checked);
  //               setShowAlert(checked); // Show alert only when checked
  //             }}
  //             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
  //           />
  //           <label htmlFor="noOffersCheckbox">
  //             Ich möchte keine E-Mails über neue Angebote und Rabatte erhalten.
  //           </label>
  //         </div>

  //         {showAlert && (
  //           <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm border border-yellow-300">
  //             <p>
  //               Sie haben gewählt, keine E-Mails über neue Angebote und Rabatte
  //               zu erhalten. Wenn Sie E-Mails erhalten möchten, deaktivieren Sie
  //               das Kontrollkästchen.
  //             </p>
  //             <p className="mt-1">
  //               You have selected not to receive emails about new offers and
  //               discounts. If you want to receive such emails, please uncheck
  //               the box.
  //             </p>
  //           </div>
  //         )}
  //       </div>

  //       {/* <button
  //         disabled={isDisabled}
  //         className="w-[200px] py-1 text-center bg-amber-400  font-bold rounded-xl text-[1.2rem] z-50"
  //         onClick={() => {
  //           proceedToOrder();
  //         }}
  //       >
  //         <span className=" text-blue-900">Submit</span>
  //         <span className=" text-sky-500">Order</span>
  //       </button> */}

  //       <button
  //         onClick={proceedToOrder}
  //         disabled={isLoading}
  //         className="w-full   px-4 py-2 font-bold rounded-xl text-[1.2rem] bg-amber-400 text-blue-900 hover:bg-amber-500 disabled:opacity-50 flex items-center justify-center gap-2"
  //       >
  //         {isLoading && (
  //           <svg
  //             className="animate-spin h-5 w-5 text-white"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //           >
  //             <circle
  //               className="opacity-25"
  //               cx="12"
  //               cy="12"
  //               r="10"
  //               stroke="currentColor"
  //               strokeWidth="4"
  //             ></circle>
  //             <path
  //               className="opacity-75"
  //               fill="currentColor"
  //               d="M4 12a8 8 0 018-8v8H4z"
  //             ></path>
  //           </svg>
  //         )}
  //         {isLoading ? (
  //           "Placing Order..."
  //         ) : (
  //           <>
  //             Place<span className="text-sky-500">Order</span>
  //           </>
  //         )}
  //       </button>
  //     </div>
  //   </div>
  // );
}
