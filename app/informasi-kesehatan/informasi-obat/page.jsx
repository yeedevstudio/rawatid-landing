import DrugCategoriesClient from "./DrugCategoriesClient";

// Halaman utama Informasi Obat menampilkan daftar kategori obat. Kategori
// diambil per halaman dari browser (/api/drug-categories/public) agar terlihat di tab Network.
// Daftar obat per kategori ada di /informasi-obat/kategori/[slug].
export default function Page() {
  return <DrugCategoriesClient />;
}
