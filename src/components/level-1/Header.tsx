"use client";

import { useEffect, useState } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import dynamic from "next/dynamic";

const FaBars = dynamic(() => import("react-icons/fa6").then((mod) => mod.FaBars), {
  ssr: false,
});

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
    <header className="header-bg header-opacity header-shadow w-full px-3 mx-auto header-rounded mt-3 z-50">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => bargerMenuToggle(false)}
            className="lg:hidden p-2 rounded-md header-toggle-hover"
            aria-label="Toggle menu"
          >
            <FaBars size={28} />
          </button>

          {/* Navigation */}
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
