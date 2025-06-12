"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSettingSchema, editSettingSchemaType, settingSchema, settingSchemaType } from "@/lib/types/settingType";
import { addNewsetting, editsetting, fetchSettings } from "@/app/(universal)/action/setting/dbOperations";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [settingName, setSettingName] = useState<editSettingSchemaType[]>([]);
  const [settingId, setSettingId] = useState<string>("");
  useEffect(() => {
    async function prefetch() {
      const settingsData = await fetchSettings();
      // console.log("cat id --------", categoriesData)
      //   const brandData = await fetchbrands();
      setSettingName(settingsData);
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
  } = useForm<editSettingSchemaType>({
    resolver: zodResolver(editSettingSchema),
  });

  //const images = watch("images");

  async function onsubmit(data: editSettingSchemaType) {
    //typeof(data.featured)
    console.log("formdata in client----- ", data);
    const formData = new FormData();
       formData.append("id", data.id!);
    formData.append("settingValue", data.settingValue!);
 

    const result = await editsetting(formData);

    if (!result?.errors) {
      // router.push('/admin/products')

    
    } else {
      alert("Some thing went wrong");
    }

   
    console.log("response  ", result);
  }
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSettingId = e.target.value;
    console.log("id selected ---------", selectedSettingId)
    setSettingId(selectedSettingId);
    setValue("id", selectedSettingId); // Update the form field with the selected setting ID
  };
  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Create Setting values</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Setting</h1>
                <div className="flex w-full flex-col gap-2   ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("settingName")}
                     onChange={(e)=>handleSelectChange(e)} 
                    className="input-style">
                      <option key="wer" value="notFind">
                        Select
                      </option>
                   
                      {settingName.map(
                        (setting) => {
                          //   console.log("cat id -------", category.id);
                          return (
                            <option key={setting.settingName} value={setting.id}>
                              {setting.settingName}
                            </option>
                          );
                        }
                      )}
                    </select>
                    {/* <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.setting.id?.message && (
                        <p>{errors.setting.settingName?.message}</p>
                      )}
                    </span> */}
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Value<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("settingValue")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.settingValue?.message && (
                        <span>{errors.settingValue?.message}</span>
                      )}
                    </span>
                  </div>
                  <button className="form-btn-style" type="submit">Save </button>
                </div>
              </div>
           
            </div>
            {/* End of left box */}

           
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
