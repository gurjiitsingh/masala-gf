"use client";
import Link from "next/link";
import React from "react";
import { allText } from "@/lib/constants/alltext";


export default function Footer() {
  return (
    <footer className="relative bg-[#eba363] pt-12 -mb-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
          <div className="flex items-center gap-1 w-full h-fit border border-amber-50 p-1 mx-1 rounded-2xl bg-amber-200">
            <div className="flex items-center justify-start rounded-full">
              <Link href="/">
                <img className="h-12 md:h-12" src="/logo.png" alt={allText.logoAlt} />
              </Link>
            </div>
            <div className="flex items-center h-fit">
              <span className="self-center text-md text-slate-700">
                {allText.brandName}
              </span>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {allText.sections.links.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {allText.sections.links.items.map((item, idx) => (
                <li key={idx} className={`pb-1 ${idx < allText.sections.links.items.length - 1 ? "border-b border-slate-400" : ""}`}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {allText.sections.company.title}
            </h3>
            <ul className="space-y-1">
              {allText.sections.company.items.map((item, idx) => (
                <li key={idx} className={idx === 0 ? "border-b border-slate-400 pb-1" : ""}>
                  <a rel="noopener noreferrer" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2 w-full px-2">
            <div className="tracking-wide text-xl font-bold uppercase">
              {allText.sections.social.title}
            </div>
            <div className="flex justify-start space-x-3">
              {/* Social icons remain unchanged; you can still externalize if needed */}
              {/* ... SVG links as-is ... */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#6a4931] mt-12 pt-3 pb-6">
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-md text-slate-100">
            {allText.footerBottom.poweredBy}{" "}
            <a href={allText.footerBottom.poweredByUrl}>
              {new URL(allText.footerBottom.poweredByUrl).hostname}
            </a>
          </p>
          <p className="text-md text-slate-100">
            {allText.footerBottom.copyright.prefix}{" "}
            {new Date().getFullYear()} {allText.footerBottom.copyright.suffix}{" "}
            <b>{allText.footerBottom.copyright.company}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
