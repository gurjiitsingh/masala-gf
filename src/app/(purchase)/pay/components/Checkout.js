import React, { useEffect } from 'react'
import {
    PayPalButtons,
   
    usePayPalScriptReducer,
  } from "@paypal/react-paypal-js";
  
  import { useRouter, useSearchParams } from "next/navigation";
  import { useCartContext } from "@/store/CartContext";

export default function Checkout(){
 const searchParams = useSearchParams();
   const orderMasterId = searchParams.get("orderMasterId");
  // console.log("orderMasterId in paypal -------------",orderMasterId)

    const [{ options, isPending,isRejected,isResolved, isInitial  }, dispatch] = usePayPalScriptReducer();
    //const [currency, setCurrency] = useState(options.currency);
  //  console.log("isPending,isRejected,isResolved, isInitial ---------", isPending,isRejected,isResolved, isInitial)
    const router = useRouter();
    const {   endTotalG } = useCartContext();
    const formattedAmount = (Number(endTotalG) || 0).toFixed(2);

   
    //  useEffect(()=>{
    //   console.log("endTotalG , type --------",endTotalG,typeof(endTotalG));
    // })

    // let customerAddress;
    // if (typeof window !== 'undefined') {
    //  customerAddress = JSON.parse(localStorage.getItem("customer_address") || '""')  ;
    // }

    let customerAddress = {};
    if (typeof window !== 'undefined') {
      const address = localStorage.getItem("customer_address");
      customerAddress = address ? JSON.parse(address) : {};
    }

// Validate German postal code (5 digits)
// const validatePostalCode = (postalCode) => {
//   const postalCodePattern = /^\d{5}$/; // German postal codes are always 5 digits
//   return postalCodePattern.test(postalCode);
// };

    // if (customerAddress?.postalCode && !validatePostalCode(customerAddress?.postalCode)) {
    //   alert("Please enter a valid German postal code.");
    //   return; // Stop the order creation if postal code is invalid
    // }
  //console.log("cartData ", productTotalCost)
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      application_context: {
        shipping_preference: "NO_SHIPPING",
       // user_action: "PAY_NOW"
      },
      purchase_units: [
        {
          amount: {
            value: formattedAmount, // should be string like "10.00"
            currency_code: "EUR",
          },
        },
      ],
      payer: {
        name: {
          given_name: customerAddress?.firstName || '',
          surname: customerAddress?.lastName || '',
        },
        email_address: customerAddress?.email || '',
        address: {
          address_line_1: customerAddress?.addressLine1 || '',
          address_line_2: customerAddress?.addressLine2 || '',
          admin_area_2: customerAddress?.city || '',        // City
          admin_area_1: customerAddress?.state || '',       // State
          postal_code: customerAddress?.zipCode || '',      // Postal Code
          country_code: "DE",                               // Germany
        },
      },
    });
  };
    const onApproveOrder = (data, actions) => {
      return actions.order.capture().then((details) => {
          router.push(`/complete?paymentType=paypal&status=success&orderMasterId=${orderMasterId}`)
       });
    };

    const onError = (err) => {
      //console.log("paypal errot-------------",err)
     router.push(`/order-fail?paymentType=paypal&status=fail&orderMasterId=${orderMasterId}&error=${encodeURIComponent(err)}`)
  }

  const onCancel= (data) => {
   // console.log("Payment Cancelled:", data);
    router.push(`/order-cancel?paymentType=paypal&status=cancel&orderMasterId=${orderMasterId}`)
  }


 
  
    return (<div className="flex container mx-auto px-[30%] items-center justify-center my-[20%] ">
      <div className="checkout">
        {(isPending || typeof window === 'undefined' || !window.paypal) ? (
          <p>LOADING...</p>
        ) : (
          <>
        
            <PayPalButtons
              message={{
                amount: endTotalG,
                align: "center",
                color: "black",
                position: "top",
              }}
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
              onError={ (err)=> onError(err)}
              onCancel = {(data)=> onCancel(data)}
            />
           
          </>
        )}
      </div></div>
    );
  };
