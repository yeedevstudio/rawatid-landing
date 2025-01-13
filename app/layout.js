import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "@/common/layouts/Header";
import Footer from "@/common/layouts/Footer";
import { Toaster } from "@/components/ui/sonner";
import AOSProvider from "@/common/layouts/AosProvider";

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
    url: "https://rawat.id",
    siteName: "Rawat.ID",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
      },
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
      },
      {
        url: "/logo.svg",
        width: 1600,
        height: 900,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased relative`}>
        <Header />
        <AOSProvider>{children}</AOSProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
