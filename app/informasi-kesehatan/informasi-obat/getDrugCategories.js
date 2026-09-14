import { normalizeCategories } from "./normalizeDrugs";

// Dipakai halaman daftar kategori dan halaman kategori/[slug]. URL + opsi
// fetch-nya sama, jadi dalam satu render pass (generateMetadata + Page) Next
// memoize request ini — API kategori hanya dipanggil sekali.
export async function getDrugCategories() {
  try {
    const res = await fetch("https://cm-api.rawat.id/drug-categories/public/all", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return normalizeCategories(await res.json());
  } catch {
    return null;
  }
}
