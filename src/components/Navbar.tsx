import Link from "next/link";
import React from "react";
import { TEXT } from "@/config/languages";

function Navbar() {
  return (
    <nav>
      <ul className="hidden lg:w-full lg:flex lg:gap-3 lg:items-center">
        {TEXT.menu.map((item: { link: string; name: string }) => (
          <li className="fit" key={item.name}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

