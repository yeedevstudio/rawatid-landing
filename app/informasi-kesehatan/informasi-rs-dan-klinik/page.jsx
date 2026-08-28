import Breadcrumbs from "@/common/components/Breadcrumbs";
import FacilitiesClient from "./FacilitiesClient";
import { getFacilities } from "@/lib/healthFacilities";

export const metadata = {
  title: "Informasi Rumah Sakit dan Klinik Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan/informasi-rs-dan-klinik",
  },
};

export default async function InformasiRsDanKlinikPage() {
  // Halaman 1 + daftar opsi filter disiapkan di server. Browser tidak pernah
  // menyentuh dataset 8,8 MB-nya.
  const initial = await getFacilities({ page: 1, withOptions: true });

  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            {
              label: "Informasi Kesehatan",
              href: "/informasi-kesehatan/informasi-obat",
            },
            {
              label: "Informasi RS dan Klinik",
              href: "/informasi-kesehatan/informasi-rs-dan-klinik",
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-16 pt-6">
        <FacilitiesClient
          initialData={{
            data: initial.data,
            page: initial.page,
            total: initial.total,
            totalPages: initial.totalPages,
          }}
          options={initial.options}
        />
      </main>
    </div>
  );
}

