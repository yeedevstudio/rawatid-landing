import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import AOSProvider from "@/common/layouts/AosProvider";
import Header from "@/common/layouts/Header";
import Footer from "@/common/layouts/Footer";

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
    "Rawat.ID",
    "Rekam Medis Elektronik",
    "Rumah Sakit",
    "Klinik",
  ],
  authors: {
    name: "Yeedev Studio",
    url: "https://www.yeedev.id/",
  },
  alternates: {
    canonical: "https://rawat.id",
  },
  canonical: "https://rawat.id",
  openGraph: {
    canonical: "https://rawat.id",
    url: "https://rawat.id",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <Script
          id="hotjar"
          // strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5297434,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased relative`}>
        <Header />
        <AOSProvider>{children}</AOSProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
