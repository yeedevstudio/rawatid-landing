import InformasiObatClient from "./InformasiObatClient";
import { normalizeDrugRows, PAGE_SIZE } from "./normalizeDrugs";

// Halaman ini sebelumnya "use client" dan baru fetch di useEffect, jadi urutan
// yang dialami HP: HTML kosong -> unduh JS -> hydrate -> baru fetch -> baru ada
// isi. Sekarang halaman pertama diambil di server dan dikirim bersama HTML;
// client hanya fetch lagi kalau user ganti halaman, mengetik pencarian, atau
// menekan filter huruf.
async function getFirstPage() {
  try {
    const params = new URLSearchParams({
      page: "1",
      perPage: String(PAGE_SIZE),
      search: "",
      navigasi: "",
    });
    const res = await fetch(
      `https://cm-api.rawat.id/drug-ingredients/public?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return normalizeDrugRows(await res.json());
  } catch {
    return null;
  }
}

export default async function Page() {
  const initialData = await getFirstPage();
  return <InformasiObatClient initialData={initialData} />;
}
