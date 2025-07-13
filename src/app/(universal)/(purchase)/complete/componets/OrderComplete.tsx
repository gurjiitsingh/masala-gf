'use client';

import { useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CartContext from '@/store/CartContext';
import { UseSiteContext } from '@/SiteContext/SiteContext';
import { useLanguage } from '@/store/LanguageContext';
import { createNewOrderFile } from '@/app/(universal)/action/newOrderFile/newfile';
import { updateOrderMaster } from '@/app/(universal)/action/orders/dbOperations';

export default function OrderComplete() {
  const searchParams = useSearchParams();
  const PaymentType = searchParams.get('paymentType');
  const Paymentstatus = searchParams.get('status');
  const orderId = searchParams.get('orderMasterId');
  const deliveryType = searchParams.get('deliveryType');
  const customerNote = searchParams.get('customerNote');
  const couponCode = searchParams.get('couponCode');
  const couponDiscount = searchParams.get('couponDiscount');

  const router = useRouter();
  const { deliveryCost } = UseSiteContext();
  const {  TEXT } = useLanguage();
  const { cartData, endTotalG, totalDiscountG, productTotalCost, emptyCart } =
    useContext(CartContext);

  const id = orderId as string;

  async function updateOrderStatus(status: string) {
    await updateOrderMaster(id, status);
  }

  async function sendOrderConfirmationEmail(email: string) {
    const response = await fetch('/api/order-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'New Order Confirmation',
        items: cartData,
        endTotalG,
      }),
    });
    console.log(response);
  }

  async function createOrder() {
    try {
      let address;
      if (typeof window !== 'undefined') {
        address = localStorage.getItem('customer_address');
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
          await sendOrderConfirmationEmail(email);
        }

        if (result === 'success') {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem('cart_product_data');
            emptyCart();
          }
        }
      }
    } catch (error) {
      console.error('Error in order completion:', error);
    }
  }

  useEffect(() => {
    createOrder();
    if (PaymentType === 'paypal' && Paymentstatus === 'success') {
      updateOrderStatus('Completed');
    }
    if (PaymentType === 'paypal' && Paymentstatus === 'fail') {
      updateOrderStatus('Payment failed');
    }
    if (PaymentType === 'stripe' && Paymentstatus === 'success') {
      updateOrderStatus('Completed');
    }
    if (PaymentType === 'stripe' && Paymentstatus === 'fail') {
      updateOrderStatus('Payment failed');
    }
  }, []);

  return (
    <div className="container bg-slate-100 mp flex rounded-2xl my-9 flex-col w-[90%] lg:w-[50%] mx-auto">
      <div className="flex flex-col gap-6 items-center">
        <div className="text-2xl font-semibold text-center">
          {TEXT?.order_complete_heading || 'Ihre Bestellung ist abgeschlossen'}
        </div>

        <div className="text-lg text-center text-slate-500">
          {TEXT?.pickup_time || 'Abholen: 20–25 Minuten'}
        </div>

        <div className="text-lg text-center text-slate-500">
          {TEXT?.delivery_time || 'Lieferzeit: 40–55 Minuten'}
        </div>

        <div>
          <button
            onClick={() => router.push('/')}
            className="min-w-[200px] mt-5 py-1 text-center primary rounded-2xl text-slate-500 text-[1rem]"
          >
            {TEXT?.shop_more_button || 'Mehr einkaufen'}
          </button>
        </div>
      </div>
    </div>
  );
}
