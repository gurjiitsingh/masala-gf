"use client";
import Navbar from "@/components/Navbar";
import Login from "../Login";
import { SessionProvider } from "next-auth/react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";

//import { useWindowDimensions } from "@/components/useWindowDimensions";

// if (global.window === undefined) {
//   global.window = global;
// }
const Header = () => {
  const { bargerMenuToggle } = UseSiteContext();
 
  return (
    <header className="bg-white shadow-md  py-1  px-4  mx-auto w-full md:w-full ">
      <div className="container mx-auto flex items-center justify-between gap-3">
      <div className="flex gap-2 items-center"><Link href="/">
        <img className="h-12 md:h-12" src="/logo.webp" alt="Logo" />
        </Link> 
        <Navbar />
      
      </div>
      <div className="flex gap-2">
        <SessionProvider>
          <Login />
        </SessionProvider>
     

        <button
          onClick={()=>bargerMenuToggle(false)}
          className="size-lg px-3 block lg:hidden"
          aria-label="toggle burger menu"
        >
         
          <FaBars className="" size={32} />
        </button>
      </div>
      </div>
    </header>
  );
};
 {/* <FaBars className="hidden md:block" size={40} /> */}
export default Header;
