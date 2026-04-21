import Breadcrumbs from "@/common/components/Breadcrumbs";

export default function InformasiRsDanKlinikPage() {
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

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Informasi RS dan Klinik
        </h1>
        <p className="mt-2 text-gray-600">
          Halaman ini siap diisi konten RS & Klinik. Kalau kamu punya struktur
          data (mis. list RS/Klinik + filter), aku bisa buat UI-nya.
        </p>
      </main>
    </div>
  );
}

