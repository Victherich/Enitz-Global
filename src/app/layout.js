


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/components/Context";
import { CartProvider } from "@/components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ENITZ GLOBAL",
  description: "Quality Products. Great Prices",
   icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
          <CartProvider>
             <ContextProvider>
          <Header />
          {children}
          <Footer />
          </ContextProvider>
          </CartProvider>
        
      </body>
    </html>
  );
}
