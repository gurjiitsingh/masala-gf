"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { GoHome } from "react-icons/go";
import { MdSpaceDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { UseSiteContext } from "@/SiteContext/SiteContext";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";

type Titem = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const menuList: Titem[] = [
  { name: "Home", link: "/", icon: <GoHome /> },
  { name: "Orders", link: "/admin", icon: <MdSpaceDashboard /> },
  { name: "Categories", link: "/admin/categories", icon: <TbCategoryPlus /> },
  { name: "Disable Pickup Discount", link: "/admin/pickupdiscount/disable-discount", icon: <TbCategoryPlus /> },
  { name: "Products", link: "/admin/productsbase", icon: <MdOutlineProductionQuantityLimits /> },
  { name: "Variants", link: "/admin/flavorsProductG", icon: <BsBorderStyle /> },
  { name: "Coupon", link: "/admin/coupon", icon: <TbCategoryPlus /> },
  { name: "Delivery", link: "/admin/delivery", icon: <TbCategoryPlus /> },
  // { name: "Orders", link: "/admin/orders", icon: <BsBorderStyle /> },
  { name: "Users", link: "/admin/users", icon: <FaUserTie /> },
  { name:"Setting",link:"/admin/setting",icon: <IoMdSettings />},
 
  
];

const Sidebar = () => {
  const { setAdminSideBarToggleG } = UseSiteContext();

  return (
    <>
      {/* Close button for mobile */}
      <div className="flex items-center pt-2 justify-between lg:hidden">
        <div></div>
        <div>
          <button
            onClick={() => setAdminSideBarToggleG(false)}
            className="p-1  rounded-xl"
            aria-label="close sidebar"
          >
            <IoClose size={30} />
          </button>
        </div>
      </div>

      {/* Sidebar content */}
      <div className="pt-12 h-screen w-[290px]  flex flex-col py-4 px-2 justify-start overflow-hidden">
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {menuList.map((item) => (
            <Tab key={item.name} item={item} />
          ))}
        </ul>

        <div className="flex items-center my-3 justify-between w-full  rounded-2xl p-2">
          <IoIosLogOut />
          <button
            onClick={() => signOut()}
            className="flex gap-2 items-center px-4 py-1 rounded-lg font-semibold text-[.9rem]"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

function Tab({ item }: { item: Titem }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isSelected = item.link === pathname;

  return (
    <Link href={item.link}>
      <li
        className={`w-full flex gap-2 items-center justify-between px-4 py-1 rounded-lg font-semibold text-[.9rem] 
        ${isSelected ? "bg-amber-900 text-white" : "bg-amber-400 text-slate-700"}`}
      >
        <div>{item.icon}</div>
        <div>{item.name}</div>
      </li>
    </Link>
  );
}

export default Sidebar;