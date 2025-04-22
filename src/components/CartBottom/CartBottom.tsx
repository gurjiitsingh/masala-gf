'use client'
//import React, { useEffect } from 'react'
import { IoCartOutline } from "react-icons/io5";
//import { usePathname } from "next/navigation";

import CartCount from './CartCount';
import { UseSiteContext } from '@/SiteContext/SiteContext'
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

//<ProductType[]>
const CartBottom = () => {
  // const router = useRouter();
  // const path = usePathname();
  // useEffect(()=>{
  //   if( path === "/pay"){
  //     console.log("path------------canged",)
  //    router.push("/")
  //   }
  //   console.log("path------------",path)
    
  // },[])

const {  sideBarToggle } = UseSiteContext();//open,

//const totalProcuts = cartData.length;
//console.log("thiiiii ", totalProcuts)
  return (
    <button onClick={()=>{sideBarToggle(false)}}> <div className=" w-fit  p-3 rounded-full bg-red-400">
         <div className=' flex flex-row gap-1  justify-between items-center    px-1 py-1'>
      <IoCartOutline className='text-white' size={30} /><div><CartCount /></div></div></div></button>
  )
}

export default CartBottom