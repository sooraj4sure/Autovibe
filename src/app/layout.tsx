import type { Metadata } from "next";
import { Playfair_Display, Poppins, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/context/StoreProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AutoVibe — Premium Car Accessories",
    template: "%s | AutoVibe",
  },
  description:
    "Discover the world's finest automotive accessories. AutoVibe curates premium interior, exterior, and tech accessories for discerning drivers.",
  keywords: [
    "luxury car accessories",
    "premium auto accessories",
    "car interior accessories",
    "car exterior accessories",
    "performance accessories",
  ],
  openGraph: {
    title: "AutoVibe — Premium Car Accessories",
    description: "Elevating the art of automotive luxury.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${cormorant.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <StoreProvider>
          {children}
          <Toaster position="bottom-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
