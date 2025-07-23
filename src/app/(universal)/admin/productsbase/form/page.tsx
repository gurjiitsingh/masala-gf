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
  } = useForm<TnewProductSchema>({
    resolver: zodResolver(newPorductSchema),
    defaultValues: {
      status: "published",
       discountPrice: "0",
    },
  });



async function onsubmit(data: TnewProductSchema) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("discountPrice", data.discountPrice || "0");
  formData.append("sortOrder", data.sortOrder);
  formData.append("categoryId", data.categoryId || "");
  formData.append("productDesc", data.productDesc || "");
  formData.append("status", data.status || "published");

  // Handle image resizing using utils/resizeImage
  if (!data.image?.[0]) {
    formData.append("image", "0");
  } else {
    try {
      const resizedImage = await resizeImage(data.image[0], 400); // height = 400px
      formData.append("image", resizedImage);
    } catch (error) {
      console.error("Image resize failed:", error);
      alert("Image resize failed. Please try again.");
      return;
    }
  }

 const result = await addNewProduct(formData);

  if (!result?.errors) {
    setValue("name", "");
    setValue("productDesc", "");
    setValue("price", "");
    setValue("isFeatured", false);
    const currentSortOrder = parseInt(data.sortOrder) || 0;
    setValue("sortOrder", (currentSortOrder + 1).toString());
    setValue("status", "published");
  } else {
    alert("Something went wrong");
  }

  console.log("response in create product form ", result);
}


  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col gap-4 p-5">
          <h1>Create Product</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Product</h1>
                <div className="flex flex-col gap-2">
                  {/* Product Name */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style">
                      Product Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] text-destructive">
                      {errors.name?.message && <span>{errors.name?.message}</span>}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select {...register("categoryId")} className="input-style">
                      <option value="notFind">Select Category</option>
                      {categoryData.map((category, i) => (
                        <option key={i} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-[0.8rem] text-destructive">
                      {errors.categoryId?.message && (
                        <p>{errors.categoryId?.message}</p>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Price Details</h1>
                <div className="flex flex-col gap-2">
                  {/* Regular Price */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style">
                      Regular Price<span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter Price"
                    />
                    <span className="text-[0.8rem] text-destructive">
                      {errors.price?.message && <span>{errors.price?.message}</span>}
                    </span>
                  </div>

                  {/* Discount Price */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style">Discount Price</label>
                    <input
                      {...register("discountPrice")}
                      className="input-style"
                      placeholder="Enter Discount Price"
                    />
                    <span className="text-[0.8rem] text-destructive">
                      {errors.discountPrice?.message && (
                        <span>{errors.discountPrice?.message}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* right box */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Image */}
              <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style">Featured Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />
                  <p className="text-[0.8rem] text-destructive">
                    {errors.image && <span>Select product image</span>}
                  </p>
                </div>
              </div>

              {/* General Detail */}
              <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                {/* Description */}
                <div className="flex flex-col gap-1">
                  <label className="label-style">Product description</label>
                  <textarea
                    {...register("productDesc")}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] text-destructive">
                    {errors.productDesc && (
                      <span>Product description is required</span>
                    )}
                  </p>
                </div>

                {/* Sort Order */}
                <div className="flex flex-col gap-1">
                  <label className="label-style">Sort Order</label>
                  <input {...register("sortOrder")} className="input-style" />
                  <span className="text-[0.8rem] text-destructive">
                    {errors.sortOrder?.message && (
                      <span>{errors.sortOrder?.message}</span>
                    )}
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1">
                  <label className="label-style">Status</label>
                  <select {...register("status")} className="input-style" defaultValue="published">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                  <span className="text-[0.8rem] text-destructive">
                    {errors.status?.message && <span>{errors.status.message}</span>}
                  </span>
                </div>

                {/* Featured */}
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
    </>
  );
};

export default Page;



//   async function onsubmit1(data: TnewProductSchema) {
//     const formData = new FormData();

//     formData.append("name", data.name);
//     formData.append("price", data.price);
//     formData.append("discountPrice", data.discountPrice || "");
//     formData.append("sortOrder", data.sortOrder);
//     formData.append("categoryId", data.categoryId || "");
//     formData.append("productDesc", data.productDesc || "");
//     formData.append("status", data.status || "published");

//     if (!data.image?.[0]) {
//       formData.append("image", "0");
//     } else {
//       formData.append("image", data.image[0]);
//     }

//     const result = await addNewProduct(formData);

//     if (!result?.errors) {
//       setValue("name", "");
//       setValue("productDesc", "");
//       setValue("price", "");
//       setValue("isFeatured", false);
//       const currentSortOrder = parseInt(data.sortOrder) || 0;
//       setValue("sortOrder", (currentSortOrder + 1).toString());
//       setValue("status", "published");
//     } else {
//       alert("Something went wrong");
//     }

//     console.log("response in create product form ", result);
//   }

// async function onsubmit2(data: TnewProductSchema) {
//   const formData = new FormData();

//   formData.append("name", data.name);
//   formData.append("price", data.price);
//   formData.append("discountPrice", data.discountPrice || "");
//   formData.append("sortOrder", data.sortOrder);
//   formData.append("categoryId", data.categoryId || "");
//   formData.append("productDesc", data.productDesc || "");
//   formData.append("status", data.status || "published");

//   // Handle image
//   if (!data.image?.[0]) {
//     formData.append("image", "0"); // or handle accordingly on server
//   } else {
//     try {
//       const resizedImage = await resizeImage(data.image[0], 400, 400); // adjust max width/height
//       formData.append("image", resizedImage);
//     } catch (error) {
//       console.error("Image resize failed:", error);
//       alert("Image resize failed. Please try again.");
//       return;
//     }
//   }

//   const result = await addNewProduct(formData);

//   if (!result?.errors) {
//     setValue("name", "");
//     setValue("productDesc", "");
//     setValue("price", "");
//     setValue("isFeatured", false);
//     const currentSortOrder = parseInt(data.sortOrder) || 0;
//     setValue("sortOrder", (currentSortOrder + 1).toString());
//     setValue("status", "published");
//   } else {
//     alert("Something went wrong");
//   }

//   console.log("response in create product form ", result);
// }
