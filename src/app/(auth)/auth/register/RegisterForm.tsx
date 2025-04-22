"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TsignUpSchema } from "@/lib/types/userType";
import { Button } from "@/components/ui/button";
import { addUserDirect } from "@/app/action/user/dbOperation";
//import {  useRouter } from "next/router";
import { useRouter } from "next/navigation";

const RegisterForm = () => {

  const router = useRouter();
  const {
    register,
    formState: { errors },//, isSubmitting
    handleSubmit,
   // setError,
   // setValue
  } = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  // setValue("username","gurjit1")
  // setValue("email","g@mail.com")
  // setValue("password","123456")
  // setValue("confirmPassword","123456")
  async function onSubmitUserRegister(data: TsignUpSchema) {
    console.log(data);

    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const result = await addUserDirect(formData);

   // if(!response?.error){
  
 if(result){
  router.push('/user');
 
 } 
 

    // const response = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   body: formData,
    // });

    // let response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   body: formData,
    // });

    // const response = await fetch("http://localhost:3000/api/signup", {
    //   method: "POST",
    //   body: JSON.stringify(userData),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const result = await response.json();
    // const products = result.data;





    //  if (result.errors) {
    //   // not network error but data validation error
    //   const errors = result.errors;

    //   if (errors.username) {
    //     setError("username", {
    //       type: "server",
    //       message: errors.username,
    //     });
    //   } else if (errors.email) {
    //     setError("email", {
    //       type: "server",
    //       message: errors.email,
    //     });
    //   } else if (errors.password) {
    //     setError("password", {
    //       type: "server",
    //       message: errors.password,
    //     });
    //   }

    //    else {
    //   //  alert("Something went wrong");
    //   }
    // }

    console.log(result);
  }

  return (
    <div className="container mx-auto bg-green-50 p-1 flex justify-center my-4 rounded-lg p-3">
    <div className="w-full md:w-[400px] m-auto my-[10%] ">
      <h3 className="text-2xl mb-4">New User Register</h3>
      <form onSubmit={handleSubmit(onSubmitUserRegister)}>
        <div className="flex w-full flex-col gap-8  my-15 ">
          <div className="flex flex-col gap-1">
            <label className="label-style">User Name</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Enter"
              className="input-style"
            />
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors?.username?.message && <p>{errors.username?.message}</p>}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="label-style">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter"
              className="input-style"
            />
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.email?.message && <p>{errors.email?.message}</p>}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="label-style">Password </label>
            <input
              {...register("password")}
              type="password"
              className="input-style"
            />

            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.password?.message && <p>{errors.password?.message}</p>}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="label-style">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="input-style"
            />

            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.confirmPassword?.message && (
                <p>{errors.confirmPassword?.message}</p>
              )}
            </p>
          </div>

          <Button type="submit">Register</Button>
        </div>
      </form>
    </div></div>
  );
};

export default RegisterForm;
