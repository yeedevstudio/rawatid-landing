import { redirect } from "next/navigation";

export const metadata = {
  title: "Sistem Faskes Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/sistem-faskes",
  },
};

export default function SistemFaskesPage() {
  redirect("/sistem-faskes/rekam-medis-elektronik");
}

