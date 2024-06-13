import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./Header";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antiliased", inter.className)}>
      <ClerkProvider>
      <Header/>
        <main className='relative flex flex-col min-h-screen'>

            {children}
        </main>
      </ClerkProvider>
      </body>
    </html>
  
  );
}
