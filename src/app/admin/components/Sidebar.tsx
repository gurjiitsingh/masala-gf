"use client";
import Link from "next/link";
import { signOut } from "next-auth/react"; //, useSession
import { MdSpaceDashboard } from "../../../../node_modules/react-icons/md";
import { MdOutlineProductionQuantityLimits } from "../../../../node_modules/react-icons/md";
import { FaUserTie } from "../../../../node_modules/react-icons/fa";
//import { GiStarsStack } from "../../../../node_modules/react-icons/gi";
//import { IoLibrary } from "../../../../node_modules/react-icons/io5";
import { BsBorderStyle } from "../../../../node_modules/react-icons/bs";
//import { SiBrandfolder } from "../../../../node_modules/react-icons/si";
import { TbCategoryPlus } from "../../../../node_modules/react-icons/tb";
//import { usePathname } from 'next/navigation';
import { IoIosLogOut } from "../../../../node_modules/react-icons/io";
import { GoHome } from "react-icons/go";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { IoClose } from "react-icons/io5";
//import { Button } from '@/components/ui/button';
//import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
//import { useState } from "react";
type Titem = {
  name: string;
  link: string;
  icon: any;
};
const menuList = [
  {
    name: "Home",
    link: "/",
    icon: <GoHome />,
  },
  {
    name: "Dashboard",
    link: "/admin",
    icon: <MdSpaceDashboard />,
  },
  {
    name:"Categories",
    link:"/admin/categories",
    icon:<TbCategoryPlus />
  },
  {
    name: "Products",
    link: "/admin/productsbase",
    icon: <MdOutlineProductionQuantityLimits />,
  },
  {
    name: "Variants",
    link: "/admin/flavorsProductG",
    icon: <MdOutlineProductionQuantityLimits />,
  },
  // {
  //   name: "Sauces",
  //   link: "/admin/productsauces",
  //   icon: <TbCategoryPlus />,
  // },
  {
    name: "Coupon",
    link: "/admin/coupon",
    icon: <TbCategoryPlus />,
  },
  {
    name: "Delivery",
    link: "/admin/delivery",
    icon: <TbCategoryPlus />,
  },

  
  // {
  //   name:"Brands",
  //   link:"/admin/brands",
  //   icon:<SiBrandfolder />
  // },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: <BsBorderStyle />,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: <FaUserTie />,
  },
  // {
  //   name:"Reviews",
  //   link:"/admin/reviews",
  //   icon: <GiStarsStack />
  // },
  // {
  //   name:"Collections",
  //   link:"/admin/collections",
  //   icon: <IoLibrary />
  // },
  // {
  //   name:"Setting",
  //   link:"/admin/setting",
  //   icon: <IoLibrary />
  // }
] as Titem[];

const Sidebar = () => {
  const { setAdminSideBarToggleG } = UseSiteContext();
  

  return (
    <>
      <div className="flex items-center  pt-2 justify-between    lg:hidden">
        <div></div>
        <div>
          <button
            onClick={() => {
              setAdminSideBarToggleG(false);
            }}
            className="p-1 border-zinc-800 rounded-xl"
            aria-label="close sidebar"
          >
            <IoClose size={30} />
          </button>
        </div>
      </div>
      <div className=" pt-12 h-screen w-[290px] border-r flex flex-col py-4 px-2  justify-start overflow-hidden">
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {menuList?.map((list) => {
            return <Tab key={list.name} item={list} />;
          })}
        </ul>
        <div className="flex  items-center my-3 justify-between w-full border-amber-500 rounded-2xl p-2">
        <IoIosLogOut />
          <button
            onClick={() => signOut()}
            className="flex gap-2 items-center px-4 py-1 rounded-lg ease-soft translate-all duration-300 font-semibold text-[.9rem]"
          >
            Logout 
          </button>
        </div>
      </div>
    </>
  );
};

function Tab(item: { item: Titem }) {
  
  //const [isSelected, setIsSelected ] = useState(false);
  //console.log("in tab ----",item.item.link)
  let isSelected = false;
  const path = usePathname();
  //console.log("path ----",path)
  
  if(item.item.link === path){
   // setIsSelected(true);
  // console.log("path--------",path)
   isSelected = true;
  }
  
  return (
    <>
     
      <Link href={item.item?.link}>
        <li
          className={`w-full bg-amber-400 flex gap-2 items-center justify-between px-4 py-1 rounded-lg ease-soft translate-all duration-300 font-semibold text-[.9rem] 
      ${isSelected ? "bg-amber-900 text-white" : "text-slate-700"}`}
        >
      <div>{item?.item.icon}</div><div> {item?.item.name}</div>    
         
        </li>
      </Link>
    </>
  );
}

export default Sidebar;
