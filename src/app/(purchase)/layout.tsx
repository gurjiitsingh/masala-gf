import type { Metadata } from "next";
import "../globals.css";
import Comcomp from "@/components/Comcomp";
import Cart from "@/components/CartBottom/CartBottom";

export const metadata: Metadata = {
  title: "Masala GF",
  description: "Masala GF food web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <Comcomp>{children}</Comcomp>
      </body>
    </html>
  );
}
