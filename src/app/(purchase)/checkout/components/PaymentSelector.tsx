"use client";

import { UseSiteContext } from "@/SiteContext/SiteContext"; // Adjust the import path as necessary

const PaymentSelector = () => {
  const { setPaymentType } = UseSiteContext();

  return (
    <div className="flex flex-col p-5 rounded-2xl border border-slate-300">
      <h3 className="text-xl font-semibold text-slate-600 pt-3 pb-1 uppercase">
        Zahlungsart auswählen
      </h3>

      <form>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="stripe"
              name="payment" // To make sure they are grouped together as radio buttons
              className="accent-amber-400"
              onChange={(e) => setPaymentType(e.target.value)} // Update context state when a payment method is selected
            />
            <span className="text-blue-900 font-semibold">Stripe</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="paypal"
              name="payment"
              className="accent-amber-400"
              onChange={(e) => setPaymentType(e.target.value)} // Update context state when a payment method is selected
            />
            <span>
              <span className="text-blue-900 font-semibold">Pay</span>
              <span className="text-sky-500 font-semibold">Pal</span>
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="cod"
              name="payment"
              className="accent-amber-400"
              onChange={(e) => setPaymentType(e.target.value)} // Update context state when a payment method is selected
            />
            <span className="text-slate-700 font-semibold">Cash on Delivery</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default PaymentSelector;