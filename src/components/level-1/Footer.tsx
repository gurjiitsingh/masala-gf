"use client";
import Link from "next/link";
import React from "react";
import { TEXT } from "@/config/languages";

export default function Footer() {
 return (
    <footer className="relative pt-12 -mb-20 footer-bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
          {/* Logo + Brand */}
          <div className="flex items-center gap-1 w-full h-fit footer-border p-1 mx-1 rounded-2xl footer-box-bg">
            <div className="flex items-center justify-start rounded-full">
              <Link href="/">
                <img className="h-12 md:h-12" src="/logo.webp" alt={TEXT.logo_alt} />
              </Link>
            </div>
            <div className="flex items-center h-fit">
              <span className="self-center text-md footer-text">
                {TEXT.brand_name}
              </span>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {TEXT.sections.links.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {TEXT.sections.links.items.map((item, idx) => (
                <li
                  key={idx}
                  className={`pb-1 ${idx < TEXT.sections.links.items.length - 1 ? "footer-item-border" : ""}`}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {TEXT.sections.company.title}
            </h3>
            <ul className="space-y-1">
              {TEXT.sections.company.items.map((item, idx) => (
                <li
                  key={idx}
                  className={idx === 0 ? "footer-item-border pb-1" : ""}
                >
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
              {TEXT.sections.social.title}
            </div>
            <div className="flex justify-start space-x-3">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bg-bottom mt-12 pt-3 pb-6">
        <div className="container mx-auto flex flex-col items-center">
          <p className="text-md footer-text-light">
            {TEXT.footer_bottom.poweredBy}{" "}
            <a href={TEXT.footer_bottom.poweredByUrl}>
              {new URL(TEXT.footer_bottom.poweredByUrl).hostname}
            </a>
          </p>
          <p className="text-md footer-text-light">
            {TEXT.footer_bottom.copyright.prefix}{" "}
            {new Date().getFullYear()} {TEXT.footer_bottom.copyright.suffix}{" "}
            <b>{TEXT.footer_bottom.copyright.company}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
