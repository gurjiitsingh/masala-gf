// app/page.tsx
"use client";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroImage from "@/components/HeroImage";
import MasalaFlyer from "@/components/MasalaFlyer";
import { useEffect } from "react";



// import MenuPreview from "@/components/MenuPreview";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";

export default function Page() {

    useEffect(() => {
    AOS.init();
    AOS.refresh();
   
  }, []);

  return (
    <main className=" text-gray-900 font-sans">
     

     <HeroImage />
      {/* <About /> */}
      <MasalaFlyer />
      {/* <MenuPreview /> */}
      {/* <Contact />
      <Footer /> */}
      
    </main>
  );
}
