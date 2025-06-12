import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "../globals.css";

import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Custom/Header";

import { SideCart } from "@/components/MiniCart/SideCart";
import { BargerMenu } from "@/components/Bargermenu/Menu";
import Footer from "@/components/Custom/Footer";

import CartBottom from "@/components/CartBottom/CartBottom";
import Modal from "./components/Modal";

export const metadata: Metadata = {
  title: "Best Athenas Food, Germany ",
  description: "Best Athenas Food in German , Gifhorn,  Lower Saxony ",
  other: {
    google: "notranslate",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        
        <SiteProvider>
          <CartProvider>
            <BargerMenu />
            <Modal />
            <Toaster
              position="top-center"
              containerStyle={{
                top: "30%",
              }}
              toastOptions={{
                style: {
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#1e293b", // slate-800
                  color: "#f8fafc", // slate-50
                },
                success: {
                  style: {
                    background: "#10b981", // emerald-500
                    color: "#ffffff",
                  },
                },
                error: {
                  style: {
                    background: "#ef4444", // red-500
                    color: "#ffffff",
                  },
                },
                loading: {
                  style: {
                    background: "#f59e0b", // amber-500
                    color: "#ffffff",
                  },
                },
              }}
              reverseOrder={false}
            />
          <div 
          className="relative w-full h-screen overflow-x-hidden bg-cover bg-[#cb9d80] md:bg-[#cb9d80] m-0 p-0"
           style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          > 
  <div
        className="absolute top-0 inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>

            <div className="z-50">
              <SideCart />
            </div>
             {/* left-0 w-full z-50 bg-white shadow-md */}
            <div className="container mx-auto  top-0 px-2 md:px-0 inset-0 z-50"> 
              <Header />
              </div>
           
            {children}

            <Footer />
           
<div className="fixed bottom-8 right-4 z-50 w-fit"><CartBottom /></div> 
</div> 
          </CartProvider>
        </SiteProvider>
       
      </body>
    </html>
  );
}
