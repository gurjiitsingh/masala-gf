"use client";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/store/LanguageContext";
import { Cinzel, Lato, Roboto, Abel } from "next/font/google";
// import { Montserrat, Oswald, Bebas_Neue, Anton, Poppins } from "next/font/google";
// import { Great_Vibes, Pacifico, Dancing_Script } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const abel = Abel({ subsets: ["latin"], weight: "400" });
const fonts = {
  Cinzel: cinzel,
  Abel: abel,
  // Playfair: playfair,
  // Cormorant: cormorant,
  // Lora: lora,
  // Montserrat: montserrat,
  // Oswald: oswald,
  // Bebas: bebas,
  // Anton: anton,
  // GreatVibes: vibes,
  // Pacifico: pacifico,
  // Dancing: dancing,
  Lato: lato,
  Roboto: roboto,
  //Poppins: poppins,
};

const fontTitle =
  fonts[process.env.NEXT_PUBLIC_FONT_TITLE as keyof typeof fonts] || cinzel;
const fontDescription =
  fonts[process.env.NEXT_PUBLIC_FONT_DESCRIPTION as keyof typeof fonts] || lato;
const fontPrice =
  fonts[process.env.NEXT_PUBLIC_FONT_PRICE as keyof typeof fonts] || roboto;

type FooterLink = { href: string; name: string };

export default function Footer() {
  const { TEXT, BRANDING } = useLanguage();

  // Fallbacks
  const fallbackBrand = {
    brand_name: BRANDING?.brand_name || "",
    poweredBy: BRANDING?.poweredBy || "Powered by",
    poweredByUrl: BRANDING?.poweredByUrl || "https://www.gstadeveloper.com",
    copyright: {
      prefix: BRANDING?.copyright?.prefix || "Copyright ©",
      suffix: BRANDING?.copyright?.suffix || "All Rights Reserved by",
      company: BRANDING?.copyright?.company || "",
    },
  };

  const fallbackText = {
    logo_alt: TEXT?.logo_alt || "Restaurant Logo",
    sections: {
      links: {
        title: TEXT?.sections?.links?.title || "Links",
        items: TEXT?.sections?.links?.items || [
          { name: "Home", href: "/" },
          { name: "Menu", href: "/menu" },
          { name: "About Us", href: "/about" },
          { name: "Contact", href: "/contact" },
          { name: "Table Reservation", href: "/reservation" },
          { name: "Allergens", href: "/allergene" },
        ],
      },
      company: {
        title: TEXT?.sections?.company?.title || "Company",
        items: TEXT?.sections?.company?.items || [
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Terms of Service", href: "#" },
        ],
      },
      social: {
        title: TEXT?.sections?.social?.title || "Social Media",
      },
    },
  };

  return (
    <footer className="relative pt-12 -mb-20 footer-bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-1">
          {/* Logo + Brand */}
          <div className="w-full">
            <div className="flex flex-col items-start  md:w-[70%] gap-1  h-fit footer-border p-2 mx-1 rounded-2xl ">
              <div className="flex items-center justify-start rounded-full">
                <Link href="/">
                  <img
                    className="h-24 md:h-24"
                    src="/logo.webp"
                    alt={fallbackText.logo_alt}
                  />
                </Link>
              </div>
              <div className="flex items-center h-fit">
                <span className={` ${fontPrice.className} self-center text-md footer-text`}>
                  {fallbackBrand.brand_name}
                </span>
              </div>
            </div>
          </div>
          {/* Links Section */}
          <div className="flex flex-col gap-2 w-full px-4">
            <h3 className={`${fontTitle.className} tracking-wide text-xl font-bold uppercase pb-3`}>
              {fallbackText.sections.links.title}
            </h3>
            <ul className="flex flex-col gap-1">
              {fallbackText.sections.links.items.map(
                (item: FooterLink, idx: number) => (
                  <li
                    key={idx}
                    className={`pb-1 ${
                      idx < fallbackText.sections.links.items.length - 1
                        ? "footer-item-border"
                        : ""
                    }`}
                  >
                    <Link href={item.href} className={`${fontDescription.className}`}>{item.name}</Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-2 w-full px-4">
            <h3 className={`${fontTitle.className} tracking-wide text-xl font-bold uppercase pb-3`}>
              {fallbackText.sections.company.title}
            </h3>
            <ul className="space-y-1">
              {fallbackText.sections.company.items.map(
                (item: FooterLink, idx: number) => (
                  <li
                    key={idx}
                    className={idx === 0 ? "footer-item-border pb-1" : ""}
                  >
                    <a rel="noopener noreferrer" className={`${fontDescription.className}`} href={item.href}>
                      {item.name}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2 w-full px-4">
            <div className={`${fontTitle.className} tracking-wide text-xl font-bold uppercase pb-3`}>
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
            {fallbackBrand.copyright.prefix} {new Date().getFullYear()}{" "}
            {fallbackBrand.copyright.suffix}{" "}
            <b>{fallbackBrand.copyright.company}</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
