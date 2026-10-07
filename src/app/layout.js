


import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from './registry';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/components/Context";
import { CartProvider } from "@/components/CartContext";
import MetaPixel from "@/components/pixels/MetaPixel";
import TikTokPixel from "@/components/pixels/TikTokPixel";
import GoogleAdsPixel from "@/components/pixels/GoogleAdsPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ENITZ",
  description: "Quality Within Reach",
   icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>

      
          <CartProvider>
             <ContextProvider>
              <MetaPixel/>
              <TikTokPixel/>
              <GoogleAdsPixel/>
          <Header />
          {children}
          <Footer />
          </ContextProvider>
          </CartProvider>
            </StyledComponentsRegistry>
        
      </body>
    </html>
  );
}
