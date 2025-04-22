import type { Metadata } from "next";
import "../globals.css";
import Comcomp from "@/components/Comcomp";


export const metadata: Metadata = {
  title: "Masala GF",
  description: "Masala GF food web app",
  other: {
    'google': 'notranslate',  
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
        <div translate="no">
        <Comcomp>{children}</Comcomp>
        </div>
      </body>
    </html>
  );
}
