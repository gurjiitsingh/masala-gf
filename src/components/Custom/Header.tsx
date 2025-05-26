"use client";

import Navbar from "@/components/Navbar";
import Login from "../Login";
import { SessionProvider } from "next-auth/react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";

const Header = () => {
  const { bargerMenuToggle } = UseSiteContext();

  return (
    <header className="bg-white shadow-md py-2 px-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo and Navbar */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="/logo.webp"
              alt="Company Logo"
              className="h-12 w-auto"
            />
          </Link>
          <Navbar />
        </div>

        {/* Right Side: Login and Menu Button */}
        <div className="flex items-center gap-3">
          <SessionProvider>
            <Login />
          </SessionProvider>

          <button
            onClick={() => bargerMenuToggle(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
