"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPorductSchema, TnewProductSchema } from "@/lib/types/productType";
import { fetchCategories } from "@/app/(universal)/action/category/dbOperations";
import { categoryType } from "@/lib/types/categoryType";
import { resizeImage } from "@/utils/resizeImage";
import { addNewProduct } from "@/app/(universal)/action/products/dbOperation";

const Page = () => {
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);

  useEffect(() => {
    async function prefetch() {
      const categoriesData = await fetchCategories();
      setCategoryData(categoriesData);
    }
    prefetch();
  }, []);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<TnewProductSchema>({
    resolver: zodResolver(newPorductSchema),
    defaultValues: {
      status: "published",
      discountPrice: 0,
      stockQty: -1,
      sortOrder: 0,
    },
  });

  async function onsubmit(data: TnewProductSchema) {
    const formData = new FormData();

    // Basic fields
    formData.append("name", data.name);
    formData.append("price", String(data.price ?? 0));
    formData.append("discountPrice", String(data.discountPrice ?? 0));
    formData.append("stockQty", String(data.stockQty ?? -1));
    formData.append("sortOrder", String(data.sortOrder ?? 0));
    formData.append("categoryId", data.categoryId || "");
    formData.append("productDesc", data.productDesc || "");
    formData.append("status", data.status || "published");
    formData.append("isFeatured", data.isFeatured ? "true" : "false");

    // Handle image resizing
    if (data.image && data.image[0]) {
      try {
        const resizedImage = await resizeImage(data.image[0], 400); // resize to height 400px
        formData.append("image", resizedImage);
      } catch (error) {
        console.error("Image resize failed:", error);
        alert("Image resize failed. Please try again.");
        return;
      }
    } else {
      // no image selected
      formData.append("image", "0");
    }

    const result = await addNewProduct(formData);

    if (!result?.errors) {
      alert("✅ Product added successfully!");
      reset({
        name: "",
        price: 0,
        discountPrice: 0,
        stockQty: -1,
        sortOrder: (Number(data.sortOrder) + 1) || 1,
        categoryId: "",
        productDesc: "",
        isFeatured: false,
        status: "published",
      });
    } else {
      console.error("❌ Validation errors:", result.errors);
      alert("Something went wrong. Check console for details.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flex flex-col gap-4 p-5">
        <h1 className="text-2xl font-semibold">Create Product</h1>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT BOX */}
          <div className="flex-1 flex flex-col gap-y-5">
            {/* Product Info */}
            <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
              <h1 className="font-semibold">Product</h1>
              {/* Product Name */}
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <input {...register("name")} className="input-style" placeholder="Enter Title" />
                <p className="text-[0.8rem] text-destructive">{errors.name?.message}</p>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="label-style">Category</label>
                <select {...register("categoryId")} className="input-style">
                  <option value="">Select Category</option>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="text-[0.8rem] text-destructive">{errors.categoryId?.message}</p>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
              <h1 className="font-semibold">Price Details</h1>

              {/* Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="label-style">Regular Price</label>
                  <input {...register("price")} className="input-style" placeholder="Enter Price" />
                  <p className="text-[0.8rem] text-destructive">{errors.price?.message}</p>
                </div>
                <div>
                  <label className="label-style">Discount Price</label>
                  <input {...register("discountPrice")} className="input-style" placeholder="Enter Discount Price" />
                  <p className="text-[0.8rem] text-destructive">{errors.discountPrice?.message}</p>
                </div>
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="label-style">Quantity</label>
                <input {...register("stockQty")} className="input-style" placeholder="Enter stock quantity" />
                <p className="text-[0.8rem] text-destructive">{errors.stockQty?.message}</p>
              </div>
            </div>
          </div>

          {/* RIGHT BOX */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Image Upload */}
            <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
              <h1 className="font-semibold">Pictures</h1>
              <label className="label-style">Featured Image</label>
              <input {...register("image")} type="file" className="input-image-style" />
              <p className="text-[0.8rem] text-destructive">{errors.image && "Select product image"}</p>
            </div>

            {/* General Details */}
            <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
              <h1 className="font-semibold">General Details</h1>

              <div>
                <label className="label-style">Description</label>
                <textarea {...register("productDesc")} className="textarea-style" />
              </div>

              <div>
                <label className="label-style">Sort Order</label>
                <input {...register("sortOrder")} className="input-style" />
                <p className="text-[0.8rem] text-destructive">{errors.sortOrder?.message}</p>
              </div>

              <div>
                <label className="label-style">Status</label>
                <select {...register("status")} className="input-style" defaultValue="published">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="label-style">Featured Product</label>
                <input {...register("isFeatured")} type="checkbox" />
              </div>

              <Button type="submit">Add Product</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
