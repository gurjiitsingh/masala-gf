"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

//import Description from "./componets/Description";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPorductSchema, TeditdeliverySchema } from "@/lib/types/deliveryType";
//import { Images } from "lucide-react";
//import { fetchCategories } from "@/app/(universal)/action/category/dbOperations";
//import { fetchofferTypes } from "@/app/(universal)/action/brads/dbOperations";
import {
  editdelivery,
  fetchdeliveryById,
} from "@/app/(universal)/action/delivery/dbOperation";
import {  useRouter, useSearchParams } from "next/navigation";


// type Terror = {
//   name: string | null;
//   price: string | null;
//   deliveryDistance: string | null;
//   company: string | null;
//   productCat: string | null;
//   deliveryDesc: string | null;
//   image: string | null;
// };
const PageComp = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
 // const id = params.editform as string;
//console.log("-----------",id)
 // const [categories, setCategory] = useState<categoryTypeArr>([]);
  //const [delivery, setdelivery] = useState({});
  const router = useRouter();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    // setError,
  } = useForm<TeditdeliverySchema>({
    resolver: zodResolver(editPorductSchema),
  });
  useEffect(() => {
    let deliveryData;
    async function prefetch() {
      deliveryData = await fetchdeliveryById(id);
    console.log("deliveryData.id ----", deliveryData)
    //setdelivery(deliveryData);
    //  const catData = await fetchCategories();
    //  console.log("----------------- delivery data in edit", catData);
    //  setCategory(catData);
      setValue("id", id);
      setValue("name", deliveryData.name);
      setValue("deliveryDesc", deliveryData.deliveryDesc);
      setValue("minSpend", deliveryData.minSpend.toString());
          //  setValue("oldImgageUrl", deliveryData.image);
      setValue("price", deliveryData.price);
      setValue("productCat", deliveryData.productCat);
      setValue("deliveryDistance", deliveryData.deliveryDistance);
    }

    prefetch();
  }, []);

  async function onsubmit(data: TeditdeliverySchema) {
       
    console.log('-----------',data)
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("productCat", data.productCat);
    formData.append("deliveryDesc", data.deliveryDesc);
   // formData.append("image", data.image[0]);
    // formData.append("oldImgageUrl",data.oldImgageUrl!)
     formData.append("minSpend", data.minSpend!);
     formData.append("deliveryDistance",data.deliveryDistance!)
    formData.append("id", data.id!);

    const result = await editdelivery(formData);

    if (!result?.errors) {
      router.push("/admin/delivery");
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
    //   if (errors.deliveryDesc) {
    //     setError("deliveryDesc", {
    //       type: "server",
    //       message: errors.deliveryDesc,
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
          <h1>Edit delivery</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">delivery</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <input {...register("id")} hidden />
                  <input {...register("oldImgageUrl")} />
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="delivery-title">
                      delivery Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input {...register("name")} className="input-style" />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>

                  {/* <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="delivery-title">
                      Category<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("productCat")} className="input-style">
                      <option key="wer" value="Mobile">
                        Select delivery Category
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
                <h1 className="font-semibold">Price Details</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="delivery-title">
                      Price<span className="text-red-500">*</span>{" "}
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
                    <label className="label-style" htmlFor="delivery-title">
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
                  <label className="label-style">delivery Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select delivery image</span>}
                  </p>
                </div>
              </div> */}

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1 w-full">
                  <label className="label-style" htmlFor="delivery-title">
                    Delivery distance<span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    {...register("deliveryDistance")}
                    className="input-style"
                    placeholder="Enter distance"
                  />
                  <span className="text-[0.8rem] font-medium text-destructive">
                    {errors.deliveryDistance?.message && (
                      <span>{errors.deliveryDistance?.message}</span>
                    )}
                  </span>
                </div>


                <div className="flex flex-col gap-1">
                  <label className="label-style">delivery description</label>

                  <textarea
                    {...register("deliveryDesc", {
                      // validate: {
                      //   pattern: (value: string) => !/[!]/.test(value),
                      // },
                    })}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.deliveryDesc && (
                      <span>delivery description is required</span>
                    )}
                  </p>
                </div>

             

                {/* <div className="flex    items-center gap-4">
                  <label className="label-style">Featured delivery</label>
                  <input {...register("deliveryDistance")} type="checkbox" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.deliveryDistance?.message && (
                      <p>{errors.deliveryDistance?.message}</p>
                    )}
                  </p>
                </div> */}

                <Button className="bg-red-500" type="submit">Edit delivery </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PageComp;
