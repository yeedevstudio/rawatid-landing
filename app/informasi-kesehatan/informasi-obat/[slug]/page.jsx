import Link from "next/link";
import Breadcrumbs from "@/common/components/Breadcrumbs";

export default async function InformasiObatDetailPage({ params }) {
  const { slug = "" } = await params;
  const name = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
            { label: "Informasi Obat", href: "/informasi-kesehatan/informasi-obat" },
            {
              label: name,
              href: `/informasi-kesehatan/informasi-obat/${slug}`,
            },
          ]}
        />
      </div>

      <main className="max-w-3xl mx-auto px-5 md:px-12 pb-10 pt-6">
      <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-900">
        {name}
      </h1>
      <p className="mt-2 text-gray-600">
        Halaman detail obat ini masih placeholder. Nanti bisa kita sambungkan ke
        API untuk menampilkan indikasi, dosis, efek samping, kontraindikasi,
        interaksi, dan peringatan.
      </p>
      </main>
    </div>
  );
}

