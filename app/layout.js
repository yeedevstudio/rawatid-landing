import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import AOSProvider from "@/common/layouts/AosProvider";
import Header from "@/common/layouts/Header";
import Footer from "@/common/layouts/Footer";
import GlobalRouteSkeleton from "@/common/components/GlobalRouteSkeleton";
import RouteClickSpinner from "@/common/components/RouteClickSpinner";
import DeferredThirdParty from "@/common/components/DeferredThirdParty";

// Bobot 300 dihapus: hanya dipakai 4 kali dan sudah dialihkan ke font-normal.
// Setiap bobot = satu berkas woff2 (~8 KB) yang diunduh BERSAMAAN dengan gambar
// hero. Di koneksi seluler, 5 font yang berebut bandwidth menahan gambar LCP
// hampir 1,9 detik. preload dimatikan dengan alasan yang sama: `display: swap`
// membuat teks tetap langsung tampil dengan font cadangan, jadi font asli tidak
// perlu ikut antre di prioritas tertinggi bersama gambar LCP.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata = {
  icon: "/favicon.ico",
  title:
    "Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  description:
    "Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  keywords: [
    "Rawat.Id",
    "Informasi Kesehatan",
    "Informasi Penyakit",
    "Gejala Penyakit",
    "Diagnosis Penyakit",
    "Penanganan Penyakit",
    "Pengobatan Penyakit",
    "Informasi Obat",
    "Manfaat Obat",
    "Kandungan Obat",
    "Efek Samping Obat",
    "Interaksi Obat",
    "Tips Hidup Sehat",
    "Menu Diet",
    "Menu Sehat",
    "Kalkulator Kesehatan",
    "Hidup Sehat",
    "Mencegah Penyakit",
    "Kesehatan Mental",
    "Tips Kesehatan",
    "Tips Penyakit",
    "Informasi Rumah Sakit",
    "Informasi Klinik",
    "Informasi Tenaga Kesehatan",
    "Informasi Fasilitas Kesehatan",
    "Direktori Kesehatan",
    "Kesehatan Masyarakat",
    "Tips Menjaga Kesehatan",
    "Tips Mencegah Penyakit",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Verifikasi kepemilikan AdSense — hanya meta tag, tidak ada biaya render. */}
        <meta name="google-adsense-account" content="ca-pub-9201441298846648" />
        {/* Thumbnail artikel diambil dari domain lain; handshake DNS+TLS-nya
            dihangatkan lebih awal agar tidak menambah antrean saat gambar dimuat. */}
        <link rel="preconnect" href="https://blog.rawat.id" crossOrigin="anonymous" />
      </head>

      <body className={`${poppins.className} antialiased relative`}>
        <Suspense fallback={<GlobalRouteSkeleton />}>
          <Header />
          <AOSProvider>{children}</AOSProvider>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <RouteClickSpinner />
        </Suspense>
        <Toaster />
        <Analytics />
        <DeferredThirdParty
          gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
          hotjarId={process.env.NEXT_PUBLIC_HOTJAR_ID}
          adsenseClient="ca-pub-9201441298846648"
        />
      </body>
    </html>
  );
}
