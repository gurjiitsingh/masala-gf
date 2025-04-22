import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function Pickup({total, pickupDiscountPersent}:{total:number, pickupDiscountPersent:number}) {
  const {   deliveryType } = UseSiteContext();
  const pickupDiscount = (+total * pickupDiscountPersent/100).toFixed(2);
 
  return (
    <>{deliveryType === "pickup" && pickupDiscountPersent !== 0 &&
       
                <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between items-center">
                  <button className="text-sm font-semibold py-3 w-full text-left">
                  Abholrabatt {pickupDiscountPersent} %
                  </button>
                  <div className="flex gap-1">
                    - <span>&#8364;</span> <span> 
                        {pickupDiscount.toString().replace(/\./g, ",")}
                        </span>
                  </div>
                </div>}
             
    
    </>
  )
}
