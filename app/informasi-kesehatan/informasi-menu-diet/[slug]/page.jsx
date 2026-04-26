import Breadcrumbs from "@/common/components/Breadcrumbs";
import MenuDietDetailClient from "./MenuDietDetailClient";

export default async function InformasiMenuDietDetailPage({ params }) {
  const { slug = "" } = await params;

  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Informasi Kesehatan", href: "/informasi-kesehatan/informasi-obat" },
            { label: "Informasi Menu Diet", href: "/informasi-kesehatan/informasi-menu-diet" },
            { label: slug, href: `/informasi-kesehatan/informasi-menu-diet/${slug}` },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <MenuDietDetailClient slug={slug} />
      </main>
    </div>
  );
}

