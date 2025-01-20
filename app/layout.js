import { Poppins } from "next/font/google";
import { lazy } from "react";
import "./globals.css";

import AOSProvider from "@/common/layouts/AosProvider";
import { Toaster } from "@/components/ui/sonner";

const Header = lazy(() => import("@/common/layouts/Header"));
const Footer = lazy(() => import("@/common/layouts/Footer"));
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Rawat ID",
  description:
    "Digitalisasi Rekam Medis dengan Rawat.ID, Pekerjaan nakes jadi lebih mudah, pelayanan jadi lebih berkualitas, faskes jadi lebih untung!",
  keywords:
    "Rawat.Id, faskes, Sistem Informasi Manajemen Kesehatan, Kesehatan, Rekam Medis, Rawat.ID",
  authors: {
    name: "Yeddev Studio",
    url: "https://www.yeedev.id/",
  },
  openGraph: {
    canocical: "https://rawat.id",
    url: "https://rawat.id",
    siteName: "Rawat.ID",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1736854216/logo_y6bey1.svg",
        width: 800,
        height: 600,
      },
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1736854216/logo_y6bey1.svg",
        width: 1200,
        height: 630,
      },
      {
        url: "https://res.cloudinary.com/ddugt5n5v/image/upload/v1736854216/logo_y6bey1.svg",
        width: 1600,
        height: 900,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.className} antialiased relative`}>
        <Header />
        <AOSProvider>{children}</AOSProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
