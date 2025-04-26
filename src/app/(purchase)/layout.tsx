import type { Metadata } from "next";
import "../globals.css";
import Comcomp from "@/components/Comcomp";


export const metadata: Metadata = {
  title: "Masala taste of India, Braunschweig-Broitzem",
  description: "Masala taste of India, Indian food",
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
    <html lang="de" translate="no">
      <body>
        <div translate="no">
        <Comcomp>{children}</Comcomp>
        </div>
      </body>
    </html>
  );
}
