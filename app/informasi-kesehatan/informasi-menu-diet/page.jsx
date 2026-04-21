import Breadcrumbs from "@/common/components/Breadcrumbs";

export default function InformasiMenuDietPage() {
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
              label: "Informasi Menu Diet",
              href: "/informasi-kesehatan/informasi-menu-diet",
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Informasi Menu Diet
        </h1>
        <p className="mt-2 text-gray-600">
          Halaman ini siap diisi konten/menu diet. Jika kamu ingin layout seperti
          “Informasi Obat”, bilang ya—aku akan samakan polanya.
        </p>
      </main>
    </div>
  );
}

