'use client'
import React from 'react'
import { IoCartOutline } from "react-icons/io5";


import CartCount from './CartCount';
import { UseSiteContext } from '@/SiteContext/SiteContext'
//<ProductType[]>
const Cart = () => {

const {  sideBarToggle } = UseSiteContext();//open,

//const totalProcuts = cartData.length;
//console.log("thiiiii ", totalProcuts)
  return (
    <button onClick={()=>{sideBarToggle(false)}}>   <div className=' flex flex-row gap-3 w-full justify-between items-center   border-2 rounded-md px-1 py-1'>
      <IoCartOutline /><div><CartCount /></div></div></button>
  )
}

export default Cart