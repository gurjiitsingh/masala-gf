"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

//import Description from "./componets/Description";
import { useForm } from "react-hook-form";

import {  couponSchema, TcouponSchema } from "@/lib/types/couponType";
//import { Images } from "lucide-react";

//import { fetchofferTypes } from "@/app/action/brads/dbOperations";
import { editcoupon, fetchcouponById } from "@/app/action/coupon/dbOperation";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


// type Terror = {
//   name: string | null;
//   price: string | null;
//   isFeatured: string | null;
//   company: string | null;
//   productCat: string | null;
//   couponDesc: string | null;
//   image: string | null;
// };
const PageCom = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  //console.log("-----------",id)
  //const [categories, setCategory] = useState<categoryTypeArr>([]);
  //const [coupon, setcoupon] = useState({});
  const router = useRouter();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    // setError,
  } = useForm<TcouponSchema>({
      resolver: zodResolver(couponSchema),
    });
  useEffect(() => {
    let couponData;
    async function prefetch() {
      couponData = await fetchcouponById(id);
      console.log("couponData.id ----", id);
      //setcoupon(couponData);
      //  const catData = await fetchCategories();
      //  console.log("----------------- coupon data in edit", catData);
      // setCategory(catData);
      setValue("id", id);
      setValue("name", couponData.name);
      setValue("couponDesc", couponData.couponDesc);
      //  setValue("oldImgageUrl", couponData.image);
      setValue("price", couponData.price.toString());
      setValue("minSpend", couponData.minSpend!.toString());
      // setValue("productCat", couponData.productCat);
      setValue("isFeatured", couponData.isFeatured);
    }

    prefetch();
  }, []);

  async function onsubmit(data: TcouponSchema) {
    const formData = new FormData();
    console.log(data);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("productCat", data.productCat);
    formData.append("couponDesc", data.couponDesc!);
    formData.append("minSpend", data.minSpend!);
    // formData.append("image", data.image[0]);
    //  formData.append("oldImgageUrl",data.oldImgageUrl!)
    // formData.append("isFeatured",data.isFeatured)
    formData.append("id", data.id!);

    const result = await editcoupon(formData);

    if (!result?.errors) {
      router.push("/admin/coupon");
    } else {
      alert("Some thing went wrong");
    }

    // if (result.errors) {
    //   // not network error but data validation error
    //   const errors:Terror = result.errors;

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
    //   } else if (errors.productCat) {
    //     setError("productCat", {
    //       type: "server",
    //       message: errors.productCat,
    //     });
    //   }
    //   if (errors.couponDesc) {
    //     setError("couponDesc", {
    //       type: "server",
    //       message: errors.couponDesc,
    //     });
    //   }
    //   if (errors.image) {
    //     setError("image", {
    //       type: "server",
    //       message: errors.image,
    //     });
    //   }

    //    else {
    //   //  alert("Something went wrong");
    //   }
    // }

    // console.log(result);
  }
  //   function setSelectedIndex(s, i){
  // s.options[i-1].selected = true;
  // return;
  // }
  //setSelectedIndex(document.getElementById("ddl_example3"),5);

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Edit coupon</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">coupon</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <input {...register("id")} hidden />
                  {/* <input {...register("oldImgageUrl")} /> */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="coupon-title">
                      coupon Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input {...register("name")} className="input-style" />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>
                  <input {...register("productCat", { value: "all" })} hidden />
                  {/* <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="coupon-title">
                      Category<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("productCat")} className="input-style">
                      <option key="wer" value="Mobile">
                        Select coupon Category
                      </option>
                      {categories.map(
                        (category: { name: string }, i: number) => {
                          return (
                            <option key={i} value={category.name}>
                              {category.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.productCat?.message && (
                        <p>{errors.productCat?.message}</p>
                      )}
                    </span>
                  </div> */}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Discount Details</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="coupon-title">
                      Discount %<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.price?.message && (
                        <span>{errors.price?.message}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2  my-15 ">
                <div className="flex flex-col gap-1 w-full">
                  <label className="label-style" htmlFor="coupon-title">
                    Min spend<span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    {...register("minSpend")}
                    className="input-style"
                    placeholder="Enter min spend"
                  />
                  <span className="text-[0.8rem] font-medium text-destructive">
                    {errors.minSpend?.message && (
                      <span>{errors.minSpend?.message}</span>
                    )}
                  </span>
                </div>
              </div>
              </div>

             
            </div>
            {/* End of left box */}

            <div className="flex-1 flex flex-col gap-5 h-full">
              {/* <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style">coupon Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select coupon image</span>}
                  </p>
                </div>
              </div> */}

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1">
                  <label className="label-style">coupon description</label>

                  <textarea
                    {...register("couponDesc"
                    //     , {
                    //   validate: {
                    //     pattern: (value: string) => !/[!]/.test(value),
                    //   },
                    // }
                )}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.couponDesc && (
                      <span>coupon description is required</span>
                    )}
                  </p>
                </div>

                {/* <div className="flex  items-center gap-4 ">
                  <label className="label-style">Normal coupon</label>
                  <input {...register("isFeatured")} type="radio" value="false" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.isFeatured?.message && (
                      <p>{errors.isFeatured?.message}</p>
                    )}
                  </p>
                </div> */}

                <div className="flex    items-center gap-4">
                  <label className="label-style">Featured coupon</label>
                  <input {...register("isFeatured")} type="checkbox" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.isFeatured?.message && (
                      <p>{errors.isFeatured?.message}</p>
                    )}
                  </p>
                </div>

                <Button className="bg-red-500" type="submit">
                  Edit coupon{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PageCom;
