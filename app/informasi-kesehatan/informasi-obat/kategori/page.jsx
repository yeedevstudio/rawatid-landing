import DrugCategoriesClient from "../DrugCategoriesClient";

export const metadata = {
  title: "Kategori Obat - Temukan Obat Berdasarkan Kategori atau Golongan",
  description:
    "Temukan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis obat berdasarkan kategori atau golongan.",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan/informasi-obat/kategori",
  },
};

// Daftar kategori obat. Kategori diambil per halaman dari browser
// (/api/drug-categories/public) agar terlihat di tab Network.
export default function Page() {
  return <DrugCategoriesClient />;
}
