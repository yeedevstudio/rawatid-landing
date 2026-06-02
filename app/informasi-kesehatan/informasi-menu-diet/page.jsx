import Breadcrumbs from "@/common/components/Breadcrumbs";
import MenuDietClient from "./MenuDietClient";

export const metadata = {
  title: "Temukan Berbagai Referensi Menu Sehat untuk Dietmu",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan/informasi-menu-diet",
  },
};

export default function InformasiMenuDietPage() {
  return (
    <div className="w-full">
      <div className="px-4 md:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            {
              label: "Informasi Kesehatan",
              href: "/informasi-kesehatan/informasi-obat",
            },
            {
              label: "Informasi Menu Diet",
              href: "/informasi-kesehatan/informasi-menu-diet",
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-10 pt-6">
        <MenuDietClient />
      </main>
    </div>
  );
}

