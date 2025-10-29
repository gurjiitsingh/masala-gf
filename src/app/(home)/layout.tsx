import "@/custom/globals.css";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
//import { getSeoMetadata } from "@/utils/getSeoMetadata";
import CartBottom from "@/components/CartBottom/CartBottom";
import "@/css/style.css";
import UTMInitializer from "../UTMInitializer";
import { Providers } from "../Providers";
import SafeSideCart from "./SafeSideCart";

import { BargerMenu } from "@/components/Bargermenu/Menu";
import Modal from "@/components/level-1/Modal";
import Header from "@/components/level-1/Header";
import Footer from "@/components/level-1/Footer";
import { SEO } from "@/config/languages";
import LogoCircle from "@/components/LogoCircle";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

// ✅ Dynamic SEO fallback logic here
//export const metadata: Metadata = getSeoMetadata();

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" translate="no">
      <head>
          <link
          href="https://fonts.googleapis.com/css2?family=Days+One&family=Dosis&family=Quicksand&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@600&display=swap"
          rel="stylesheet"
        />

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"></link>

<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Smythe&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${playfair.variable} font-playfair bg-[#EFEDE5] text-[#2B2E4A]`}>
        <div className=" bg-[#EFEDE5] text-[#2B2E4A]">
        <div translate="no">
          <UTMInitializer />
          <Providers>
            <BargerMenu />
            <Modal />

            <div className="flex flex-col gap-0 my-0 ">
              <div className="z-50">
                <SafeSideCart />
              </div>

              {/* <div className="container mx-auto top-0 px-2 md:px-0 inset-0 z-50"> */}
              <Header />
              {/* </div> */}
              <LogoCircle />
              {children}

              <Footer />

              <div className="fixed bottom-8 right-4 z-50 w-fit">
                {/* <CartBottom /> */}
              </div>
            </div>
          </Providers>

          <Toaster
            position="top-center"
            containerStyle={{ top: "30%" }}
            toastOptions={{
              style: {
                borderRadius: "10px",
                padding: "12px 16px",
              },
              className: "toast-default",
              success: { className: "toast-success" },
              error: { className: "toast-error" },
              loading: { className: "toast-loading" },
            }}
            reverseOrder={false}
          />
        </div>
        </div>
      </body>
    </html>
  );
}
