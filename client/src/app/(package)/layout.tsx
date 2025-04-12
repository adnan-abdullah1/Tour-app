import type { Metadata } from "next";
import {  Inter } from "next/font/google";


const inter = Inter({ subsets: ['latin'] , weight: ['400', '500', '600', '700']})

export const metadata: Metadata = {
  title: "package title",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="ml-4 mr-4 " >
                
                {children}
        </div>
     
  );
}
