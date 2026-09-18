import DrugCategoriesClient from "../DrugCategoriesClient";

export const metadata = {
  title: "Golongan Obat - Temukan Obat Berdasarkan Kategori atau Golongan",
  description:
    "Temukan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis obat berdasarkan kategori atau golongan.",
  alternates: {
    canonical: "https://www.rawat.id/informasi-kesehatan/informasi-obat/golongan",
  },
};

// Daftar golongan obat. Golongan diambil per halaman dari browser
// (/api/drug-classes/public) agar terlihat di tab Network.
export default function Page() {
  return <DrugCategoriesClient kind="golongan" />;
}
