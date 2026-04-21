import Breadcrumbs from "@/common/components/Breadcrumbs";

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
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Pengingat Minum Obat
        </h1>
        <p className="mt-2 text-gray-600">
          Halaman ini siap diisi fitur pengingat minum obat.
        </p>
      </main>
    </div>
  );
}

