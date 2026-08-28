import { redirect } from "next/navigation";

export const metadata = {
  title: "Informasi Kesehatan Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan",
  },
};

export default function Page() {
  redirect("/informasi-kesehatan/informasi-obat");
}

