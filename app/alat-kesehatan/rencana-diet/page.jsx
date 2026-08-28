import Breadcrumbs from "@/common/components/Breadcrumbs";
import Page505 from "@/common/components/Page505";

export const metadata = {
  title: "Rencana Diet Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/alat-kesehatan/rencana-diet",
  },
};

export default function RencanaDietPage() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Rencana Diet", href: "/alat-kesehatan/rencana-diet" },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <Page505 title="Rencana Diet" />
      </main>
    </div>
  );
}

