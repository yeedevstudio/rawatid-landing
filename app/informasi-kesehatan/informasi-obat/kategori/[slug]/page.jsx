import { notFound } from "next/navigation";
import InformasiObatClient from "../../InformasiObatClient";
import { getDrugCategories } from "../../getDrugCategories";

// null = API kategori gagal (belum tahu kategorinya ada atau tidak),
// undefined = daftar berhasil dimuat tapi slug tidak ditemukan.
async function findCategory(slug) {
  const categories = await getDrugCategories();
  if (!categories) return null;
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await findCategory(slug);
  const name = category?.name || slug;
  return {
    title: `Daftar Obat Kategori ${name} - Manfaat, Dosis dan Efek Samping`,
    description: `Temukan daftar obat kategori ${name} lengkap dengan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis.`,
    alternates: {
      canonical: `https://www.rawat.id/informasi-kesehatan/informasi-obat/kategori/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const category = await findCategory(slug);

  // API kategori gagal: lempar error supaya tidak dirender sebagai 404 (yang
  // bisa membuat halaman kategori valid terhapus dari indeks mesin pencari).
  if (category === null) throw new Error("Gagal memuat kategori obat");
  if (!category) notFound();

  // Server hanya mencocokkan slug -> kode kategori (untuk title/meta & 404).
  // Daftar obatnya diambil InformasiObatClient dari browser.
  return <InformasiObatClient key={category.code} category={category} />;
}
