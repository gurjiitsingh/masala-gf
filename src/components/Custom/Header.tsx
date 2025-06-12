"use client";

import Navbar from "@/components/Navbar";
import Login from "../Login";
import { SessionProvider } from "next-auth/react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { FaBars } from "react-icons/fa6";


const Header = () => {
  const { bargerMenuToggle } = UseSiteContext();
// #eafad6
  return (
    <header className="bg-[#eba363] px-3 opacity-70 z-50 shadow-md  w-full mx-auto  rounded-xl  mt-3">
      <div className=" flex items-center justify-between">
        {/* Left Side: Logo and Navbar */}
        <div className="flex items-center gap-4">

          <button
            onClick={() => bargerMenuToggle(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={28} />
          </button>
          {/* <Link href="/">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="h-12 w-auto"
            />
          </Link> */}
          <Navbar />
        </div>

        {/* Right Side: Login and Menu Button */}
        <div className="flex items-center gap-3">
          <SessionProvider>
            <Login />
          </SessionProvider>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
