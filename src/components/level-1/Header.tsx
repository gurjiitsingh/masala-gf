"use client";

import { useEffect, useState } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";

import dynamic from "next/dynamic";

// Dynamically import FaBars icon
const FaBars = dynamic(
  () => import("react-icons/fa6").then((mod) => mod.FaBars),
  {
    ssr: false,
  }
);

import Navbar from "@/components/level-2/Navbar";
import Login from "../buttons/Login";
import { LanguageSwitcher } from "../../languages/LanguageSwitcher";

const Header = () => {
  const { bargerMenuToggle } = UseSiteContext();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <header className="bg-[#64870d] px-3 opacity-70 z-50 shadow-md w-full mx-auto rounded-xl mt-3">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => bargerMenuToggle(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={28} />
          </button>

          {/* Uncomment when needed */}
          {/* <Link href="/">
            <img
              src="/logo.webp"
              alt="Company Logo"
              className="h-12 w-auto"
            />
          </Link> */}

         
          <Navbar />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
           <LanguageSwitcher />
          <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;
