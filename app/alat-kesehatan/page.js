import { redirect } from "next/navigation";

export const metadata = {
  title: "Alat Kesehatan Digital Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/alat-kesehatan",
  },
};

export default function Page() {
  redirect("/alat-kesehatan/kalkulator-bmi");
}

