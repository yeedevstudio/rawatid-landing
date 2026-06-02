import MenuDietDetailClient from "./MenuDietDetailClient";

export async function generateMetadata({ params }) {
  const { slug = "" } = await params;
  try {
    const res = await fetch(`https://cm-api.rawat.id/menu-nutritions/public/slug/${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    const json = await res.json().catch(() => null);
    const name = json?.data?.menu_name || json?.menu_name || slug;
    return {
      title: `Kandungan Nutrisi untuk Menu Diet ${name}`,
      alternates: {
        canonical: `https://www.rawat.id/informasi-kesehatan/informasi-menu-diet/${slug}`,
      },
    };
  } catch {
    return {
      title: `Kandungan Nutrisi untuk Menu Diet ${slug}`,
    };
  }
}

export default async function InformasiMenuDietDetailPage({ params }) {
  const { slug = "" } = await params;

  return (
    <div className="w-full">
      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <MenuDietDetailClient slug={slug} />
      </main>
    </div>
  );
}

