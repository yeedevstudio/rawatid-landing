import Breadcrumbs from "@/common/components/Breadcrumbs";
import MenuDietClient from "./MenuDietClient";

const CM_API = "https://cm-api.rawat.id";
const PER_PAGE = 12;

const getJson = async (path) => {
  try {
    const res = await fetch(`${CM_API}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const list = (json) =>
  Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];

// Empat fetch ini dulu jalan di browser setelah hydrate, jadi halaman sampai ke
// HP dalam keadaan kosong. Sekarang dikerjakan server secara paralel.
async function getInitialData() {
  const [menus, types, categories, ingredients] = await Promise.all([
    getJson(`/menu-nutritions/public?page=1&perPage=${PER_PAGE}`),
    getJson("/menu-types/public/all"),
    getJson("/menu-categories/public/all"),
    getJson("/basic-ingredients/public/all"),
  ]);

  if (!menus) return null;

  return {
    items: list(menus),
    meta: {
      total: Number(menus?.total || 0),
      perPage: PER_PAGE,
      totalPages: Number(menus?.totalPages || 1),
    },
    menuTypes: list(types),
    menuCategories: list(categories),
    basicIngredients: list(ingredients),
  };
}

export const metadata = {
  title: "Temukan Berbagai Referensi Menu Sehat untuk Dietmu",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan/informasi-menu-diet",
  },
};

export default async function InformasiMenuDietPage() {
  const initialData = await getInitialData();

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
        <MenuDietClient initialData={initialData} />
      </main>
    </div>
  );
}

