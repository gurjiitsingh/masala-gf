'use client'
import React from 'react'
//import { FaShoppingCart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
//import { ProductType } from  '@/utils/types'
//import { useCartContext } from '@/store/CartContext'
import Link from 'next/link';
import CartCount from './CartCount';
//<ProductType[]>
const Cart = () => {
//const { cartData } = useCartContext();
//const totalProcuts = cartData.length;
// console.log("thiiiii ", totalProcuts)
  return (
    <Link href="/cart"><div className='flex flex-row gap-3 w-full justify-between items-center ml-3  border-2 rounded-md px-1 py-1'>
      <IoCartOutline /><div><CartCount /></div></div></Link>
  )
}

export default Cart