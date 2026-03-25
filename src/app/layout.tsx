import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOIR CAFÉ | Darkness, Perfected",
  description: "Specialty coffee, crafted for those who demand more than ordinary. Experience the cinematic coffee ritual of NOIR CAFÉ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-inter antialiased noise`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
