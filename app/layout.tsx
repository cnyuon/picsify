import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./Header";
import Footer from "@/Footer";
import { Analytics } from '@vercel/analytics/react';
import  Head from "next/head";
import Script from "next/script";




const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" className="h-full">
      <Head>
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-LQEB98X9EH`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LQEB98X9EH');
          `}
        </Script>
      </Head>
      <body className={cn("relative h-full font-sans antiliased", inter.className)}>
      <ClerkProvider>
      <Header/>
        <main className='relative flex flex-col min-h-screen'>

            {children}
        </main>
        <Footer />
        
      </ClerkProvider>
      <Analytics />
      </body>
    </html>
  
  );
}
