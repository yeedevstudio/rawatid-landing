import { Suspense } from "react";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import AOSProvider from "@/common/layouts/AosProvider";
import Header from "@/common/layouts/Header";
import Footer from "@/common/layouts/Footer";
import GlobalRouteSkeleton from "@/common/components/GlobalRouteSkeleton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  icon: "/favicon.ico",
  title:
    "Rawat.ID - Rekam Medis Elektronik Lengkap untuk Rumah Sakit dan Klinik",
  description:
    "Digitalisasi Rekam Medis dengan Rawat.ID, Pekerjaan nakes jadi lebih mudah, pelayanan jadi lebih berkualitas, faskes jadi lebih untung!",
  keywords: [
    "Rawat.Id",
    "faskes",
    "Sistem Informasi Manajemen Kesehatan",
    "Kesehatan",
    "Rekam Medis",
    "Rekam Medis Elektronik",
    "Rumah Sakit",
    "Klinik",
  ],
  authors: {
    name: "Yeedev Studio",
    url: "https://www.yeedev.id/",
  },
  alternates: {
    canonical: "https://www.rawat.id",
  },
  openGraph: {
    url: "https://www.rawat.id",
    siteName: "Rawat.ID",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png",
        width: 1200,
        height: 630,
      },
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png",
        width: 1600,
        height: 900,
      },
    ],
  },
};

// ============================================================================
// Scripts Configuration
// ============================================================================

const scripts = {
  hotjar: {
    id: "hotjar",
    strategy: "lazyOnload",
  },
  googleAnalytics: {
    id: "google-analytics",
    strategy: "afterInteractive",
  },
  googleAdsense: {
    id: "google-adsense",
    strategy: "lazyOnload",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hotjar Analytics */}
        <Script
          id={scripts.hotjar.id}
          strategy={scripts.hotjar.strategy}
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          strategy={scripts.googleAnalytics.strategy}
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <Script
          id={scripts.googleAnalytics.id}
          strategy={scripts.googleAnalytics.strategy}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', { 
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google AdSense */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9201441298846648"
        />
        <Script
          id={scripts.googleAdsense.id}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9201441298846648"
          crossOrigin="anonymous"
          strategy={scripts.googleAdsense.strategy}
        />
      </head>

      <body className={`${poppins.className} antialiased relative`}>
        <Suspense fallback={<GlobalRouteSkeleton />}>
          <Header />
          <AOSProvider>{children}</AOSProvider>
          <Footer />
        </Suspense>

        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
