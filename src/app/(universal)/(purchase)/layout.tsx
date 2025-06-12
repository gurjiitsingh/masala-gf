import type { Metadata } from "next";
import "../../globals.css";
import Comcomp from "@/components/Comcomp";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Masala taste of India, Braunschweig-Broitzem",
  description: "Masala taste of India, Indian food",
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
    <html lang="de" translate="no">
      <body>
        <div translate="no">
          <Comcomp>{children}</Comcomp>
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
        </div>
      </body>
    </html>
  );
}
