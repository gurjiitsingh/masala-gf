// app/page.tsx
"use client";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroImage from "@/components/HeroImage";
import { useEffect } from "react";
import FlyerBuffet from "@/components/FlyerBuffet";
import FlavorLine from "@/components/FlavorLine";
import SpecialRecommendations from "@/components/SpecialRecommendations";
import ContactInfo from "@/components/ContactInfo";
import QuoteBanner from "@/components/QuoteBanner";
import Catering from "@/components/Catering";

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
      <FlavorLine />
      <HeroImage />
      <SpecialRecommendations />
      {/* <About /> */}
      {/* <MasalaFlyer /> */}
      <FlyerBuffet />

      <QuoteBanner />
      <Catering />
      <ContactInfo />
      {/* <MenuPreview /> */}
      {/* <Contact />
      <Footer /> */}
    </main>
  );
}
