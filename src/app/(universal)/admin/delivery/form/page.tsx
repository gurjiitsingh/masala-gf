"use client";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPorductSchema, TnewdeliverySchema } from "@/lib/types/deliveryType";
//import { fetchofferTypes } from "@/app/(universal)/action/brads/dbOperations";
import { addNewdelivery } from "@/app/(universal)/action/delivery/dbOperation";
//import Images from "@/app/(universal)/admin/deliverys/form/componets/Images";

//import Input from "./componets/input";

// type Terror = {
//   name: string | null;
//   price: string | null;
//   deliveryDistance: string | null;
//  // company: string | null;
//   productCat: string | null;
//   deliveryDesc: string | null;
//   image: string | null;
// };
const Page = () => {
  // console.log("addonprodut form  minSpend============", minSpend);

  // useEffect(() => {
  //   async function prefetch() {
  //     const catData = await fetchCategories();
  //     //   const offerTypeData = await fetchofferTypes();

  //     // setofferType(offerTypeData);
  //   }
  //   prefetch();
  // }, []);

  const {
    register,
    formState: { errors },
    setValue,
    // control,
    // watch,
    handleSubmit,
    // setError,
    formState: {}, //dirtyFields
  } = useForm<TnewdeliverySchema>({
    resolver: zodResolver(newPorductSchema),
  });

  //const images = watch("images");

  async function onsubmit(data: TnewdeliverySchema) {
    //typeof(data.featured)
    const formData = new FormData();

    // console.log("images---------", data);
    const code = data.name.toUpperCase();
    formData.append("name", code);
    formData.append("price", data.price);
    formData.append("deliveryDistance", data.deliveryDistance!);
    //formData.append("offerType", data.offerType);
    // formData.append("weight", data.weight);
    // formData.append("dimensions", data.dimensions);
    formData.append("productCat", data.productCat);
    formData.append("deliveryDesc", data.deliveryDesc!);
    //  formData.append("image", data.image[0]);
    formData.append("minSpend", data.minSpend!);
    const result = await addNewdelivery(formData);

    if (!result?.errors) {
      // router.push('/admin/deliverys')

      setValue("name", "");
      setValue("deliveryDesc", "");
      setValue("price", "");
      setValue("productCat", "");
      setValue("minSpend", "");
      // setValue("weight", "");
      // setValue("dimensions", "");
      setValue("deliveryDistance", "");
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
    //   if (errors.company) {
    //     // setError("company", {
    //     //   type: "server",
    //     //   message: errors.company,
    //     // });
    //   } else {
    //     //  alert("Something went wrong");
    //   }
    // }

    // console.log("response in create delivery form ", result);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Delivery info</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Delivery detail</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="delivery-title">
                      Zip code<span className="text-red-500">*</span>{" "}
                    </label>

                    <input
                      {...register("name")}
                      className="input-style"
                      placeholder="Zip code"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>
                  <input
                    {...register("productCat", { value: "all" })}
                    type="hidden"
                  />
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
                <h1 className="font-semibold">Cost </h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="delivery-title">
                      Delivery cost<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter cost"
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
                  <label className="label-style">Featured Image</label>
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

                <input
                  {...register("deliveryDesc", { value: "delivery info" })}
                  type="hidden"
                />

                {/* <div className="flex flex-col gap-1">
                  <label className="label-style">Description</label>

                  <textarea
                    {...register("deliveryDesc", {
                      validate: {
                        pattern: (value: string) => !/[!]/.test(value),
                      },
                    })}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.deliveryDesc && <span>Description is required</span>}
                  </p>
                </div> */}

                {/* <div className="flex  items-center gap-4 ">
                  <label className="label-style">Normal delivery</label>
                  <input {...register("featured")} type="radio" value="false" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.featured?.message && (
                      <p>{errors.featured?.message}</p>
                    )}
                  </p>
                </div> */}

              

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

                <Button type="submit">Add delivery detail </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
