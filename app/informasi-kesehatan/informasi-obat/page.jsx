import InformasiObatClient from "./InformasiObatClient";

// Halaman utama Informasi Obat menampilkan daftar semua obat
// (/api/drug-ingredients/public tanpa filter kategori). Daftar kategori ada di
// /informasi-obat/kategori, dan obat per kategori di /informasi-obat/kategori/[slug].
export default function Page() {
  return <InformasiObatClient />;
}
