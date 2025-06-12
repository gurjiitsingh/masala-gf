"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { couponSchema, TcouponSchema } from "@/lib/types/couponType";
import { editcoupon, fetchcouponById } from "@/app/(universal)/action/coupon/dbOperation";

const EditForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const router = useRouter();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TcouponSchema>({
    resolver: zodResolver(couponSchema),
  });

  useEffect(() => {
    async function prefetch() {
      const couponData = await fetchcouponById(id);
      setValue("id", id);
      setValue("code", couponData.code);
      setValue("couponDesc", couponData.couponDesc);
      setValue("discount", couponData.discount.toString());
      setValue("minSpend", couponData.minSpend!.toString());
      setValue("isFeatured", couponData.isFeatured);
      setValue("discountType", couponData.discountType || "percentage");
      setValue("expiry", couponData.expiry?.split("T")[0]); // for input type="date"
      setValue("message", couponData.message || "");
    }

    prefetch();
  }, [id, setValue]);

  async function onsubmit(data: TcouponSchema) {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("discount", data.discount);
    formData.append("productCat", data.productCat || "all");
    formData.append("couponDesc", data.couponDesc || "");
    formData.append("minSpend", data.minSpend || "");
    formData.append("isFeatured", data.isFeatured ? "true" : "false");
    formData.append("discountType", data.discountType || "percentage");
    formData.append("expiry", data.expiry!);
    formData.append("message", data.message || "");
    if (data.expiry) formData.append("expiry", data.expiry);
    formData.append("id", data.id || "");

    const result = await editcoupon(id, formData);
    if (!result?.error) {
      router.push("/admin/coupon");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flexflex flex-col gap-4 p-5">
        <h1>Edit coupon</h1>
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Section */}
          <div className="flex-1 flex flex-col gap-y-5">
            {/* Coupon Basic Info */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h1 className="font-semibold">Coupon Detail</h1>
              <input {...register("id")} hidden />
              <input {...register("productCat", { value: "all" })} hidden />

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Coupon Name<span className="text-red-500">*</span>
                </label>
                <input {...register("code")} className="input-style" />
                <span className="text-[0.8rem] text-destructive">
                  {errors.code?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-style">Discount Type</label>
                <div className="flex items-center gap-4">
                  <label>
                    <input
                      type="radio"
                      value="flat"
                      {...register("discountType")}
                    />{" "}
                    Flat
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="percentage"
                      {...register("discountType")}
                    />{" "}
                    Percentage
                  </label>
                </div>
                <span className="text-[0.8rem] text-destructive">
                  {errors.discountType?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Discount Value<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("discount")}
                  className="input-style"
                  placeholder="Enter discount value"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.discount?.message}
                </span>
              </div>
            </div>

            {/* Discount Info */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h1 className="font-semibold">Discount Details</h1>

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Minimum Spend<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("minSpend")}
                  className="input-style"
                  placeholder="Minimum spend amount"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.minSpend?.message}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="label-style">Expiry Date</label>
                <input
                  type="date"
                  {...register("expiry")}
                  className="input-style"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.expiry?.message}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h1 className="font-semibold">General Details</h1>

              <div className="flex flex-col gap-1">
                <label className="label-style">Coupon Description</label>
                <textarea
                  {...register("couponDesc")}
                  className="textarea-style"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.couponDesc && "Coupon description is required"}
                </span>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="label-style">Message</label>
                <textarea {...register("message")} className="textarea-style" />
                <span className="text-[0.8rem] text-destructive">
                  {errors.message?.message}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <label className="label-style">Featured Coupon</label>
                <input type="checkbox" {...register("isFeatured")} />
                <span className="text-[0.8rem] text-destructive">
                  {errors.isFeatured?.message}
                </span>
              </div>

              <Button type="submit" className="bg-red-500">
                Edit Coupon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
