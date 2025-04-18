import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import HeaderView from "@/modules/shared/components/header/header-view";
import FooterView from "@/modules/shared/components/footer-view";
import Subscribe from "@/modules/home/components/subscribe-view";

const inter = Inter({ subsets: ['latin'] , weight: ['400', '500', '600', '700']})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} antialiased `}>
        <div className="flex flex-col min-h-screen  ">
          <HeaderView />
          
          {/* main should grow to fill the space between header and footer */}
          <main className="flex-1 ">{children}</main>
          
          <Subscribe />
          <FooterView />
         
         
        </div>
      </body>
    </html>
  );
}


