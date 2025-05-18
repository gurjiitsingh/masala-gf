
import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Custom/Header";

import { SideCart } from '@/components/MiniCart/SideCart';
import { BargerMenu } from '@/components/Bargermenu/Menu'
import Footer from "./Custom/Footer";
import CartBottom from "./CartBottom/CartBottom";




export default function Comcomp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
      
     <SiteProvider >
      <CartProvider>
        <BargerMenu />
      
      <SideCart />
     
      <Header />
    {children}
    <Footer />
<div className="fixed bottom-8 right-4 z-50 w-fit"><CartBottom /></div> 
      </CartProvider>
      </SiteProvider>
      </>
     
     
  );
}
