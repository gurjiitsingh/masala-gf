"use client";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/store/LanguageContext";

type FooterLink = { href: string; name: string };

export default function Footer() {
  const { TEXT, BRANDING } = useLanguage();

  // Fallbacks
  const fallbackBrand = {
    brand_name: BRANDING?.brand_name || "Masala Taste of India",
    poweredBy: BRANDING?.poweredBy || "Powered by",
    poweredByUrl: BRANDING?.poweredByUrl || "https://www.gstadeveloper.com",
    copyright: {
      prefix: BRANDING?.copyright?.prefix || "Copyright ©",
      suffix: BRANDING?.copyright?.suffix || "All Rights Reserved by",
      company: BRANDING?.copyright?.company || "Masala Taste of India",
    },
  };

  const fallbackText = {
    logo_alt: TEXT?.logo_alt || "Restaurant Logo",
    sections: {
      links: {
        title: TEXT?.sections?.links?.title || "Links",
        items:
          TEXT?.sections?.links?.items || [
            { name: "Startseite", href: "/" },
            { name: "Speisekarte", href: "/menu" },
            { name: "Über uns", href: "/about" },
            { name: "Kontakt", href: "/contact" },
            { name: "Tischreservierung", href: "/reservation" },
            { name: "Allergene", href: "/allergene" },
          ],
      },
      company: {
        title: TEXT?.sections?.company?.title || "Unternehmen",
        items:
          TEXT?.sections?.company?.items || [
            { name: "Datenschutz", href: "/privacy" },
            { name: "Nutzungsbedingungen", href: "#" },
          ],
      },
      social: {
        title: TEXT?.sections?.social?.title || "Soziale Medien",
      },
    },
  };

  return (
    <footer className="relative pt-12 -mb-20 footer-bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
          {/* Logo + Brand */}
          <div className="flex items-center gap-1 w-full h-fit footer-border p-1 mx-1 rounded-2xl footer-box-bg">
            <div className="flex items-center justify-start rounded-full">
              <Link href="/">
                <img className="h-12 md:h-12" src="/logo.webp" alt={fallbackText.logo_alt} />
              </Link>
            </div>
            <div className="flex items-center h-fit">
              <span className="self-center text-md footer-text">
                {fallbackBrand.brand_name}
              </span>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {fallbackText.sections.links.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {fallbackText.sections.links.items.map((item: FooterLink, idx: number) => (
                <li
                  key={idx}
                  className={`pb-1 ${idx < fallbackText.sections.links.items.length - 1 ? "footer-item-border" : ""}`}
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-2 w-full px-2">
            <h3 className="tracking-wide text-xl font-bold uppercase">
              {fallbackText.sections.company.title}
            </h3>
            <ul className="space-y-1">
              {fallbackText.sections.company.items.map((item: FooterLink, idx: number) => (
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
              {fallbackText.sections.social.title}
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
            {fallbackBrand.poweredBy}{" "}
            <a href={fallbackBrand.poweredByUrl}>
              {new URL(fallbackBrand.poweredByUrl).hostname}
            </a>
          </p>
          <p className="text-md footer-text-light">
            {fallbackBrand.copyright.prefix}{" "}
            {new Date().getFullYear()} {fallbackBrand.copyright.suffix}{" "}
            <b>{fallbackBrand.copyright.company}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
