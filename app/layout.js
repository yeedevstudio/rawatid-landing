import { Poppins } from "next/font/google";
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
      <body className={`${poppins.className} antialiased relative`}>
        <Header />
        <AOSProvider>{children}</AOSProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
