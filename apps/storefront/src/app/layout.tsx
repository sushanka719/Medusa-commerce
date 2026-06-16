import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ToastProvider from "@/components/ToastProvider";

const inter = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Aluna | Luxury Fragrances & Home Essentials",
  description:
    "Discover exceptional fragrances and artisanal home essentials crafted for those who appreciate the finer things in life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[var(--background)]`} suppressHydrationWarning>
        <div className="max-w-[1600px] mx-auto border-x border-[var(--card-border)] min-h-screen flex flex-col relative shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)]">
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </div>
        <CartSidebar />
        <ToastProvider />
      </body>
    </html>
  );
}
