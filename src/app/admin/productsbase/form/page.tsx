"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPorductSchema, TnewProductSchema } from "@/lib/types/productType";
import { addNewProduct } from "@/app/action/productsbase/dbOperation";
import { fetchCategories } from "@/app/action/category/dbOperations";
import { categoryType } from "@/lib/types/categoryType";

const Page = () => {
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  useEffect(() => {
    async function prefetch() {
      const categoriesData = await fetchCategories();
      // console.log("cat id --------", categoriesData)
      //   const brandData = await fetchbrands();
      setCategoryData(categoriesData);
      // setBrand(brandData);
    }
    prefetch();
  }, []);

  const {
    register,
    formState: { errors },
    setValue,
    // control,
    // watch,
    handleSubmit,
    // setError,
    formState: {}, //dirtyFields
  } = useForm<TnewProductSchema>({
    resolver: zodResolver(newPorductSchema),
  });

  //const images = watch("images");

  async function onsubmit(data: TnewProductSchema) {
    //typeof(data.featured)
    console.log("formdata in client----- ", data);
    const formData = new FormData();
     console.log("images client---------", data.image[0]);
     if(data.image[0] === undefined){
      console.log("undefind")
      formData.append("image", "0");
     }else{
      formData.append("image", data.image[0]);
     }
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice!);
    // formData.append("isFeatured", data.isFeatured);
    // formData.append("isFeatured", true);
    formData.append("sortOrder", data.sortOrder);
    formData.append("categoryId", data.categoryId!);
    formData.append("productDesc", data.productDesc);
   
    
    const result = await addNewProduct(formData);

    if (!result?.errors) {
      // router.push('/admin/products')

      setValue("name", "");
      setValue("productDesc", "");
      setValue("price", "");
     // setValue("sortOrder", "");
      // setValue("brand", "Select Brand");
      // setValue("weight", "");
      // setValue("dimensions", "");
      setValue("isFeatured", false);
    } else {
      alert("Some thing went wrong");
    }

    // if (result.errors) {
    //   // not network error but data validation error
    //   const errors: Terror = result.errors;

    //   if (errors.name) {
    //     setError("name", {
    //       type: "server",
    //       message: errors.name,
    //     });
    //   } else if (errors.price) {
    //     setError("price", {
    //       type: "server",
    //       message: errors.price,
    //     });
    //   } else if (errors.sortOrder) {
    //     setError("sortOrder", {
    //       type: "server",
    //       message: errors.sortOrder,
    //     });
    //   }
    //   if (errors.productDesc) {
    //     setError("productDesc", {
    //       type: "server",
    //       message: errors.productDesc,
    //     });
    //   }
    //   if (errors.image) {
    //     setError("image", {
    //       type: "server",
    //       message: errors.image,
    //     });
    //   }
    //   if (errors.company) {
    //     // setError("company", {
    //     //   type: "server",
    //     //   message: errors.company,
    //     // });
    //   } else {
    //     //  alert("Something went wrong");
    //   }
    // }

    console.log("response in create product form ", result);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Create Product</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Product</h1>
                <div className="flex w-full flex-col gap-2   ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Product Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("name")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Category<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("categoryId")} className="input-style">
                      <option key="wer" value="notFind">
                        Select Category
                      </option>
                      {categoryData.map(
                        (category: { name: string; id: string }, i: number) => {
                       //   console.log("cat id -------", category.id);
                          return (
                            <option key={i} value={category.id}>
                              {category.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.categoryId?.message && (
                        <p>{errors.categoryId?.message}</p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Price Details</h1>
                <div className="flex w-full flex-col gap-2   ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Regular Price<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter Price"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.price?.message && (
                        <span>{errors.price?.message}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Discount Price<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("discountPrice")}
                      className="input-style"
                      placeholder="Enter Price"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.discountPrice?.message && (
                        <span>{errors.discountPrice?.message}</span>
                      )}
                    </span>
                  </div>

                </div>
              </div>
            </div>
            {/* End of left box */}

            <div className="flex-1 flex flex-col gap-5 h-full">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style">Featured Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select product image</span>}
                  </p>
                </div>
                {/* multiple images upload */}
              </div>

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1">
                  <label className="label-style">Product description</label>

                  <textarea
                    {...register(
                      "productDesc"
                      //   , {
                      //   validate: {
                      //     pattern: (value: string) => !/[!]/.test(value),
                      //   },
                      // }
                    )}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.productDesc && (
                      <span>Product description is required</span>
                    )}
                  </p>
                </div>

                {/* <div className="flex  items-center gap-4 ">
                  <label className="label-style">Normal Product</label>
                  <input {...register("featured")} type="radio" value="false" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.featured?.message && (
                      <p>{errors.featured?.message}</p>
                    )}
                  </p>
                </div> */}

                <div className="flex flex-col gap-1">
                  <label className="label-style">Sort Order</label>
                  <input {...register("sortOrder")} className="input-style" />
                  <span className="text-[0.8rem] font-medium text-destructive">
                    {errors.sortOrder?.message && (
                      <span>{errors.sortOrder?.message}</span>
                    )}
                  </span>
                </div>

                <div className="flex    items-center gap-4">
                  <label className="label-style">Featured Product</label>
                  <input {...register("isFeatured")} type="checkbox" />
                  <span className="text-[0.8rem] font-medium text-destructive">
                    {errors.isFeatured?.message && (
                      <p>{errors.isFeatured?.message}</p>
                    )}
                  </span>
                </div>

                <Button type="submit">Add Product </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
