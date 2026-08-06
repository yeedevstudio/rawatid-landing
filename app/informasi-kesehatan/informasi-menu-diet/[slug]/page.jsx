import MenuDietDetailClient from "./MenuDietDetailClient";

const CM_API = "https://cm-api.rawat.id";
const REVALIDATE = 3600;

const getJson = async (path) => {
  try {
    const res = await fetch(`${CM_API}${path}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const getDetail = (slug) =>
  getJson(`/menu-nutritions/public/slug/${encodeURIComponent(slug)}`);

// Dua fetch ini dulu jalan di browser setelah hydrate, jadi HP melihat halaman
// kosong dulu. Sekarang keduanya paralel di server.
async function getInitialData(slug) {
  const [detailJson, othersJson] = await Promise.all([
    getDetail(slug),
    getJson("/menu-nutritions/public?page=1&perPage=12"),
  ]);

  const detail = detailJson?.data || detailJson;
  if (!detail) return null;

  const arr = Array.isArray(othersJson?.data) ? othersJson.data : [];

  return {
    detail,
    otherMenus: arr.filter((m) => m?.slug && m.slug !== slug).slice(0, 6),
  };
}

export async function generateMetadata({ params }) {
  const { slug = "" } = await params;
  // URL identik dengan yang dipanggil Page, jadi di-memoize dalam satu render.
  const json = await getDetail(slug);
  const name = json?.data?.menu_name || json?.menu_name || slug;
  return {
    title: `Kandungan Nutrisi untuk Menu Diet ${name}`,
    alternates: {
      canonical: `https://www.rawat.id/informasi-kesehatan/informasi-menu-diet/${slug}`,
    },
  };
}

export default async function InformasiMenuDietDetailPage({ params }) {
  const { slug = "" } = await params;
  const initialData = await getInitialData(slug);

  return (
    <div className="w-full">
      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <MenuDietDetailClient slug={slug} initialData={initialData} />
      </main>
    </div>
  );
}
