'use client'

import { setPickupDiscount } from "@/app/action/setting/dbOperations";
import { useForm } from "react-hook-form";

type PickupDiscountForm = {
 
  pickup_discount:number;
};

export default function PickupDiscountForm({ onSave }: { onSave: (value: number) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PickupDiscountForm>();

//   const onSubmit = (data: PickupDiscountForm) => {
//     onSave(data.pickup_discount); // Call parent function to save/update the value
//   };

//   const onSubmit = async (data: PickupDiscountForm) => {
//     try {
//       await setPickupDiscount(data.discount);
//       alert(`Pickup discount set to ${data.discount}%`);
//      // reset();
//     } catch (error: any) {
//       alert("Error: " + error.message);
//     }
//   };

const onSubmit = async (data: PickupDiscountForm) => {
   try {
    const discountValue = Number(data.pickup_discount); // Ensure it's a number
    if (isNaN(discountValue)) throw new Error("Invalid discount value");

    await setPickupDiscount(discountValue);
    alert(`Pickup discount set to ${discountValue}%`);
   // reset();
  } catch (error: any) {
    alert("Error updating pickup discount: " + error.message);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg bg-white shadow-md">
      <label className="block text-sm font-medium text-gray-700">Select Pickup Discount</label>
      <select
        {...register("pickup_discount", { required: true })}
        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        defaultValue=""
      >
        <option value="" disabled>Select a discount</option>
        {Array.from({ length: 30 }, (_, i) => i + 1).map((val) => (
          <option key={val} value={val}>
            {val}%
          </option>
        ))}
      </select>
      {errors.pickup_discount && <span className="text-red-500 text-sm">Please select a discount value</span>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Save Discount
      </button>
    </form>
  );
}
