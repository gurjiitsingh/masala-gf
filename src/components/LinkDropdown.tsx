"use client";

import React from "react";
import { FaRegUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CustomSessionType } from "@/lib/types/auth"; 

const LinkDropdown = ({ session }: { session: CustomSessionType | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-white-700 hover:text-red-600 transition">
        <FaRegUser className="text-xl" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-[#64870d] text-white shadow-lg rounded-md">
        <DropdownMenuSeparator />

        {!session && (
          <>
            <DropdownMenuItem>
              <Link href="/auth/login" className="w-full block">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register" className="w-full block">
                Register
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {session?.user?.role === "admin" && (
          <DropdownMenuItem>
            <Link href="/admin/" className="w-full block">
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        {session?.user?.role === "user" && (
          <DropdownMenuItem>
            <Link href="/user/" className="w-full block">
              My Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        {session && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button
                onClick={() => signOut()}
                className="w-full text-left text-sm text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkDropdown;
