"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; //, Controller
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressResT,
  addressSchimaCheckout,
  TaddressSchemaCheckout,
} from "@/lib/types/addressType";
import {
  searchAddressEmail,
  // searchAddressByUserId,
} from "@/app/(universal)/action/address/dbOperations";
import { FaCheck } from "react-icons/fa";
import { useSession } from "next-auth/react";

//import { searchUserById } from "@/app/(universal)/action/user/dbOperation";
import { createNewOrderCustomerAddress } from "@/app/(universal)/action/orders/dbOperations";
import { purchaseDataT } from "@/lib/types/cartDataType";
import { fetchdeliveryByZip } from "@/app/(universal)/action/delivery/dbOperation";
import { UseSiteContext } from "@/SiteContext/SiteContext";

const Address = () => {
  // const { endTotalG, cartData, totalDiscountG } = useCartContext();

  const {
    //deliveryDis,

    setdeliveryDis,
    chageDeliveryType,
    deliveryType,
    customerEmail,
    setCustomerAddressIsComplete,
    customerAddressIsComplete,
    emailFormToggle,
  } = UseSiteContext();

  const { data: session } = useSession();

  useEffect(() => {
    if (customerEmail !== undefined) {
      getAddressByEmail(customerEmail);
    }
    if (deliveryType === null) {
      chageDeliveryType("pickup");
    }
  }, [session, customerEmail]);

  useEffect(() => {
    setCustomerAddressIsComplete(false);
    setValue("password", "123456");
    setValue("city", "Lower Saxony");
  }, []);

  async function handleZipcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const zipname: string = e.target.value;
    if (zipname.length > 4) {
      const result = await fetchdeliveryByZip(zipname);
      setdeliveryDis(result);
    }
  }

  function changeEmailHandler() {
    emailFormToggle(true);
  }

  const {
    register,
    formState: { errors }, //, isSubmitting
    handleSubmit,
    // reset,
    setValue,
    // getValues,
    // setError,
  } = useForm<TaddressSchemaCheckout>({
    resolver: zodResolver(addressSchimaCheckout),
  });
  function changeHandler() {
    //code is removed
    // can be used in future
  }

  async function onSubmit(data: TaddressSchemaCheckout) {
 

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userId", data.userId!);
    formData.append("email", data.email);
    formData.append("mobNo", data.mobNo);
    formData.append("password", data.password!);
    formData.append("addressLine1", data.addressLine1!);
    formData.append("addressLine2", data.addressLine2!);
    formData.append("city", data.city!);
    formData.append("state", data.state!);
    formData.append("zipCode", data.zipCode!);

    let addressIsComplete = true;

    if (deliveryType === "delivery" && data.zipCode === "") {
      addressIsComplete = false;
      alert(
        "Bitte geben Sie die Postleitzahl für die Lieferung ein oder wählen Sie Abholung"
      );
      //Please enter the postcode for delivery or choose pickup
    }

    if (addressIsComplete) {
      setCustomerAddressIsComplete(true);
      const customAddress = {
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId,
        email: data.email,
        mobNo: data.mobNo,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("customer_address", JSON.stringify(customAddress));
      }
      //await addCustomerAddress(formData);

      const purchaseData = {
        userId: "sfad", //session?.user?.id,
        address: customAddress,
      } as purchaseDataT;

      const result = await createNewOrderCustomerAddress(purchaseData);

      const addressAddedIdS = result.addressAddedId;
      const userAddedIdS = result.UserAddedId;
      const customerNameS = result.customerName;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "customer_address_Id",
          JSON.stringify(addressAddedIdS)
        );
        localStorage.setItem("order_user_Id", JSON.stringify(userAddedIdS));
        localStorage.setItem("customer_name", JSON.stringify(customerNameS));
      }

      //createNewOrderFile(cartData, customAddress);
    }
    // end of ok order condition
  }

  return (
    <div className="w-full  md:border border-slate-300 md:rounded-2xl p-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-600  uppercase">
            {/* Shipping address */}
            Adresse
            {/* -- {session?.user?.id} --- {session?.user?.name} */}
          </h2>
          {/* <p className="text-sm">
            Enter the address where you want your order delivered.
          </p> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("userId")} hidden />
          {/* <input {...register("orderDetail")} hidden /> */}
          <div className="flex w-full flex-col gap-2  ">
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Email<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("email", {
                  onChange: () => {
                    changeEmailHandler();
                  },
                  // onBlur: () => {},
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.email?.message && (
                  <span className="text-red-500">{errors.email?.message}</span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Mob no.<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("mobNo", {
                  onChange: () => {
                    changeHandler();
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.mobNo?.message && (
                  <span className="text-red-500">{errors.mobNo?.message}</span>
                )}
              </span>
            </div>
            <input {...register("password", { value: "123456" })} hidden />
            {/* {!session && (
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Password.<span className="text-red-500">Optional</span>{" "}
                </label>
                <input {...register("password")} className="input-style" />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.password?.message && (
                    <span>{errors.password?.message}</span>
                  )}
                </span>
              </div>
            )} */}
            <div className="w-full flex flex-row gap-2">
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  First name<span className="text-red-500">*</span>{" "}
                </label>
                <input
                  {...register("firstName", {
                    onChange: () => {
                      changeHandler();
                    },
                  })}
                  className="input-style"
                />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.firstName?.message && (
                    <span className="text-red-500">
                      {errors.firstName?.message}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Last name<span className="text-red-500">*</span>{" "}
                </label>
                <input
                  {...register("lastName", {
                    onChange: () => {
                      changeHandler();
                    },
                  })}
                  className="input-style"
                />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.lastName?.message && (
                    <span className="text-red-500">
                      {errors.lastName?.message}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                Straße<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("addressLine1", {
                  onChange: () => {
                    changeHandler();
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine1?.message && (
                  <span className="text-red-500">
                    {errors.addressLine1?.message}
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="label-style">
                {/* Address line 2 */}
                Straße Hausnr
                <span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("addressLine2", {
                  onChange: () => {
                    changeHandler();
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.addressLine2?.message && (
                  <span className="text-red-500">
                    {errors.addressLine2?.message}
                  </span>
                )}
              </span>
            </div>
            <input {...register("city", { value: "gf" })} hidden />
            {/* <div className="flex flex-col gap-1">
              <label className="label-style">
                City<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("city")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.city?.message && <span>{errors.city?.message}</span>}
              </span>
            </div> */}
            {/* <div className="flex flex-col gap-1">
              <label className="label-style">
                State<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("state")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.state?.message && <span>{errors.state?.message}</span>}
              </span>
            </div> */}
            <div className="flex flex-col gap-1">
              <label className="label-style">
                Postleitzahl<span className="text-red-500">*</span>{" "}
              </label>
              <input
                {...register("zipCode", {
                  onChange: (e) => {
                    handleZipcodeChange(e);
                  },
                })}
                className="input-style"
              />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.zipCode?.message && (
                  <span className="text-red-500">
                    {errors.zipCode?.message}
                  </span>
                )}
              </span>
            </div>
            {/* <div className="flex  justify-start gap-8 border rounded-full w-full py-2 px-2 items-center">
              <div className="px-2 py-2 bg-slate-700 rounded-full flex justify-center items-center">
                <input
                  {...register("payment")}
                  type="radio"
                  value="paypal"
                  //  checked
                />{" "}
              </div>
              <div>Paypal</div>
            </div>
            <div className="flex  justify-start gap-8 border rounded-full w-full py-2 px-2 items-center">
              <div className="px-2 py-2 bg-slate-700 rounded-full flex justify-center items-center">
                <input {...register("payment")} type="radio" value="cod" />{" "}
              </div>
              <div>Cash on delivery</div>
            </div> */}
            <div className="flex justify-start items-center gap-2">
              
              <div className="w-fit">
                <button className="w-fit px-2 py-1 text-center bg-amber-400 text-blue-900 font-bold rounded-xl text-[1.2rem] z-50">
               
                  <span className=" text-blue-900">Use </span>
                  <span className=" text-sky-500">Address</span>
                </button>
              </div>

              <div className="h-5 flex justify-center">
                { customerAddressIsComplete && (
                  <FaCheck className="text-green-300 " size={24} />
                )}
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );

  async function getAddressByEmail(inputEmail: string) {
    const addressRes = await searchAddressEmail(inputEmail);
    if (addressRes?.firstName !== null) {
      setAddress(addressRes);
      const zipInfo = await fetchdeliveryByZip(addressRes.zipCode);
      setdeliveryDis(zipInfo);
    }
    //  setValue("email", inputEmail);
  }

  async function getAddressByID() {
    // const custAddressRes =
    //   (await searchAddressByUserId(session?.user.id)) || {};
    //    setFormAddress(custAddressRes);
  }

  async function setFormAddress(custAddressRes: addressResT) {
    // let setemail;
    if (custAddressRes.email !== undefined) {
      // setAddressFound(true)

      setAddress(custAddressRes);
    } else {
      const userResById = "khkjhk"; //await searchUserById(session?.user?.id);
      if (userResById !== undefined) {
        //   setValue("email", userResById.email);
        //    console.log("this is befor email set---------------2",userResById.email)
        // setValue("firstName", userResById.firstName);
        // setValue("lastName", userResById.lastName);
        // setValue("userId", userResById.userId);
        // setValue("email", userResById.email);
        // setValue("mobNo", userResById.mobNo);
        // setValue("addressLine1", userResById.addressLine1);
        // setValue("addressLine2", userResById.addressLine2);
        // setValue("city", userResById.city);
        // setValue("state", userResById.state);
        // setValue("zipCode", userResById.zipCode);
      }
    }
  }
  function setAddress(addressRes: addressResT) {
    setValue("email", addressRes.email);
    setValue("firstName", addressRes.firstName);
    setValue("lastName", addressRes.lastName);
    setValue("mobNo", addressRes.mobNo);
    setValue("addressLine1", addressRes.addressLine1);
    setValue("addressLine2", addressRes.addressLine2);
    setValue("city", addressRes.city);
    setValue("state", addressRes.state);
    setValue("zipCode", addressRes.zipCode);
  }
}; // end of rfc

export default Address;
