import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from './Header';
import Footer from '@/Footer';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <title>My Website</title>
        {/* Add other meta tags here */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3097071261671376"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </Head>
      <body className={`relative h-full font-sans antiliased ${inter.className}`}>
        <ClerkProvider>
          <Header />
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
        </ClerkProvider>
        <Analytics />
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
      </body>
    </html>
  );
}
