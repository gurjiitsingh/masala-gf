"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="w-full flex justify-center items-center px-2">
      <div className="relative w-full max-w-6xl">
        <Image
          src="/images/hero-3.jpg"
          alt="Lakeside Außenansicht"
          width={2560}
          height={1920}
          priority
          className="rounded-lg shadow-md object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}
