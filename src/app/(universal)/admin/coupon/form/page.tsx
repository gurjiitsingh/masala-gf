"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TcouponSchema, couponSchema } from "@/lib/types/couponType";
import { db } from "@/lib/firebaseConfig";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";

type CategoryType = {
  id: string;
  name: string;
};

const Page = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<TcouponSchema>({
    resolver: zodResolver(couponSchema),
  });

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [excludedCategoryIds, setExcludedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getDocs(collection(db, "category"));
      const data: CategoryType[] = [];
      result.forEach((doc) =>
        data.push({ id: doc.id, ...(doc.data() as any) })
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleExcludedChange = (id: string) => {
    setExcludedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

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

    // Extra metadata
    const startDate = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(startDate.getFullYear() + 1);

    const excludedNames = categories
      .filter((cat) => excludedCategoryIds.includes(cat.id))
      .map((cat) => cat.name)
      .join(" and ");

    const couponData = {
      code,
      discount: Number(data.discount),
      discountType: data.discountType,
      offerType: data.offerType,
      couponDesc: data.couponDesc,
      productCat: "all",
      minSpend: Number(data.minSpend),
      expiry: data.expiry,
      isFeatured: !!data.isFeatured,
      isActivated: true,
      applyPickup: data.applyPickup ?? true,
  applyDelivery: data.applyDelivery ?? true,
      excludedCategoryIds,
      message: excludedNames
        ? `Not applicable on ${excludedNames}.`
        : data.couponDesc,
      startDate: startDate.toLocaleString(),
      createdAt: Timestamp.now(),
    };

    console.log("couponData new data -------------", couponData)

    try {
      await addDoc(collection(db, "coupon"), couponData);
    } catch (err) {
      console.error("Failed to save coupon", err);
    }

    setValue("code", "");
    setValue("discount", "");
    setValue("minSpend", "");
    setExcludedCategoryIds([]);
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flex flex-col gap-4 p-5">
        <h1>Create Coupon</h1>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Box */}
          <div className="flex-1 flex flex-col gap-y-5">
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">Coupon Detail</h2>

              <div>
                <label className="label-style">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("code")}
                  className="input-style"
                  placeholder="Enter code"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.code?.message}
                </span>
              </div>

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
                <span className="text-[0.8rem] text-destructive">
                  {errors.discountType?.message}
                </span>
              </div>

              <div>
                <label className="label-style">
                  Discount Amount <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("discount")}
                  className="input-style"
                  placeholder="Enter amount"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.discount?.message}
                </span>
              </div>

              <input
                type="hidden"
                {...register("productCat", { value: "all" })}
              />
            </div>

            {/* Conditions */}
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">Discount Conditions</h2>

              <div>
                <label className="label-style">
                  Min Spend <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("minSpend")}
                  className="input-style"
                  placeholder="Enter min spend"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.minSpend?.message}
                </span>
              </div>

              <div>
                <label className="label-style">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
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

          {/* Right Box */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">General Detail</h2>

              <input
                type="hidden"
                {...register("couponDesc", {
                  value: "This is discount coupon",
                })}
              />

              <div>
                <label className="label-style">Description</label>
                <textarea
                  {...register("couponDesc")}
                  className="textarea-style"
                />
                <span className="text-[0.8rem] text-destructive">
                  {errors.couponDesc && "Description is required"}
                </span>
              </div>

        

             

      

         

            
            </div>
          </div>



<div className="flex-1 flex flex-col gap-5">
            <div className="bg-white rounded-xl p-4 border flex flex-col gap-3">
              <h2 className="font-semibold">General Conditions</h2>

         

              <div>
                <label className="label-style">Offer Type</label>
                <select
                  {...register("offerType")}
                  className="input-style"
                  defaultValue="MA"
                >
                  <option value="MA">MA</option>
                  <option value="CM">CM</option>
                </select>
                <span className="text-[0.8rem] text-destructive">
                  {errors.offerType?.message}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <label className="label-style">Featured Coupon</label>
                <input type="checkbox" {...register("isFeatured")} />
                <span className="text-[0.8rem] text-destructive">
                  {errors.isFeatured?.message}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-style">Apply Coupon On</label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    {...register("applyPickup")}
                  />
                  Pickup
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    {...register("applyDelivery")}
                  />
                  Delivery
                </label>
              </div>

              <div>
                <label className="label-style">Exclude Categories</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={excludedCategoryIds.includes(cat.id)}
                        onChange={() => handleExcludedChange(cat.id)}
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </div>



        </div>
      </div>
    </form>
  );
};

export default Page;
