import Breadcrumbs from "@/common/components/Breadcrumbs";
import Page505 from "@/common/components/Page505";

export const metadata = {
  title: "Pengingat Minum Obat Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/alat-kesehatan/pengingat-minum-obat",
  },
};

export default function PengingatMinumObatPage() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            {
              label: "Pengingat Minum Obat",
              href: "/alat-kesehatan/pengingat-minum-obat",
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <Page505 title="Pengingat Minum Obat" />
      </main>
    </div>
  );
}

