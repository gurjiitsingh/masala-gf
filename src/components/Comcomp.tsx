
import Header from "@/components/level-1/Header";

import { SideCart } from '@/components/MiniCart/SideCart';
import { BargerMenu } from '@/components/Bargermenu/Menu'
import Footer from "@/components/level-1/Footer";
import CartBottom from "./CartBottom/CartBottom";
import { Providers } from "@/app/Providers";
import { LanguageProvider } from "@/store/LanguageContext";




export default function Comcomp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
      <Providers>
     
        <BargerMenu />
      
      <SideCart />
     
      <div className="container mx-auto  top-0 px-2 md:px-0 inset-0 z-50">
                <Header />
              </div>
              
    {children}
  
    <Footer />
<div className="fixed bottom-8 right-4 z-50 w-fit"><CartBottom /></div> 
      </Providers>
      </>
     
     
  );
}
