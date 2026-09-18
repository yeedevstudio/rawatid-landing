import { notFound } from "next/navigation";
import InformasiObatClient from "../../InformasiObatClient";
import { getDrugClasses } from "../../getDrugCategories";

// null = API golongan gagal (belum tahu golongannya ada atau tidak),
// undefined = daftar berhasil dimuat tapi slug tidak ditemukan.
async function findDrugClass(slug) {
  const classes = await getDrugClasses();
  if (!classes) return null;
  return classes.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const drugClass = await findDrugClass(slug);
  const name = drugClass?.name || slug;
  return {
    title: `Daftar Obat Golongan ${name} - Manfaat, Dosis dan Efek Samping`,
    description: `Temukan daftar obat golongan ${name} lengkap dengan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis.`,
    alternates: {
      canonical: `https://www.rawat.id/informasi-kesehatan/informasi-obat/golongan/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const drugClass = await findDrugClass(slug);

  // API golongan gagal: lempar error supaya tidak dirender sebagai 404 (yang
  // bisa membuat halaman golongan valid terhapus dari indeks mesin pencari).
  if (drugClass === null) throw new Error("Gagal memuat golongan obat");
  if (!drugClass) notFound();

  // Daftar obatnya diambil InformasiObatClient dari browser (filter drug_class_code).
  return <InformasiObatClient key={drugClass.code} category={drugClass} kind="golongan" />;
}
