"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TcouponSchema, couponSchema } from "@/lib/types/couponType";
import { addNewcoupon } from "@/app/action/coupon/dbOperation";

const Page = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TcouponSchema>({
    resolver: zodResolver(couponSchema),
  });

  async function onsubmit(data: TcouponSchema) {
    const formData = new FormData();
    const code = data.code.toUpperCase();

    formData.append("code", code);
    formData.append("discount", data.discount);
    formData.append("offerType", data.offerType!);
    formData.append("expiry", data.expiry!);
    formData.append("discountType", data.discountType!);
    formData.append("productCat", data.productCat);
    formData.append("couponDesc", data.couponDesc!);
    formData.append("minSpend", data.minSpend!);
    if (data.isFeatured) {
      formData.append("isFeatured", "true");
    }

    const result = await addNewcoupon(formData);

    setValue("code", "");
    setValue("discount", "");
    setValue("minSpend", "");
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flex flex-col gap-4 p-5">
        <h1>Create Coupon</h1>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Box */}
          <div className="flex-1 flex flex-col gap-y-5">
            {/* Coupon Detail */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">Coupon Detail</h2>

              {/* Coupon Code */}
              <div>
                <label className="label-style">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input {...register("code")} className="input-style" placeholder="Enter code" />
                <span className="text-[0.8rem] text-destructive">{errors.code?.message}</span>
              </div>

              {/* Discount Type (Radio) */}
              <div>
                <label className="label-style">
                  Discount Type <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="flat"
                      {...register("discountType")}
                    />
                    Flat
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="percent"
                      {...register("discountType")}
                    />
                    Percent
                  </label>
                </div>
                <span className="text-[0.8rem] text-destructive">{errors.discountType?.message}</span>
              </div>

              {/* Discount Amount */}
              <div>
                <label className="label-style">
                  Discount Amount <span className="text-red-500">*</span>
                </label>
                <input {...register("discount")} className="input-style" placeholder="Enter amount" />
                <span className="text-[0.8rem] text-destructive">{errors.discount?.message}</span>
              </div>

              {/* Hidden productCat */}
              <input type="hidden" {...register("productCat", { value: "all" })} />
            </div>

            {/* Discount Conditions */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">Discount Conditions</h2>

              {/* Min Spend */}
              <div>
                <label className="label-style">
                  Min Spend <span className="text-red-500">*</span>
                </label>
                <input {...register("minSpend")} className="input-style" placeholder="Enter min spend" />
                <span className="text-[0.8rem] text-destructive">{errors.minSpend?.message}</span>
              </div>

              {/* Expiry Date (Date Picker) */}
              <div>
                <label className="label-style">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("expiry")}
                  className="input-style"
                />
                <span className="text-[0.8rem] text-destructive">{errors.expiry?.message}</span>
              </div>
            </div>
          </div>

          {/* Right Box */}
          <div className="flex-1 flex flex-col gap-5">
            {/* General Detail */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">General Detail</h2>

              <input
                type="hidden"
                {...register("couponDesc", { value: "This is discount coupon" })}
              />

              {/* Description */}
              <div>
                <label className="label-style">Description</label>
                <textarea {...register("couponDesc")} className="textarea-style" />
                <span className="text-[0.8rem] text-destructive">
                  {errors.couponDesc && "Description is required"}
                </span>
              </div>

              {/* Offer Type */}
              <div>
                <label className="label-style">Offer Type</label>
                <input
                  {...register("offerType", { value: "All" })}
                  className="input-style"
                  placeholder="All"
                />
                <span className="text-[0.8rem] text-destructive">{errors.offerType?.message}</span>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-4">
                <label className="label-style">Featured Coupon</label>
                <input type="checkbox" {...register("isFeatured")} />
                <span className="text-[0.8rem] text-destructive">{errors.isFeatured?.message}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-amber-400 italic font-bold rounded-xl text-[1.2rem] text-blue-900"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
