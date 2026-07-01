import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elalteno.restaurant"),
  title: "El Alteño — Auténtica Comida Mexicana | Watsonville, CA",
  description:
    "Authentic Mexican food in Watsonville, CA. Fresh seafood, house specialties, handmade tortillas, signature cocktails, and private event space for up to 100 guests.",
  keywords: [
    "Mexican restaurant Watsonville",
    "El Alteño",
    "authentic Mexican food California",
    "mariscos Watsonville CA",
    "private events Watsonville",
  ],
  openGraph: {
    title: "El Alteño — Auténtica Comida Mexicana",
    description:
      "Fresh seafood, house specialties, and signature cocktails in Watsonville, CA. Private event space for up to 100 guests.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

import WatermarkBg from "@/components/ui/WatermarkBg";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#161311] relative overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            <WatermarkBg />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
