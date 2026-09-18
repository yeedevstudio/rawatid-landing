import { CM_API_BASE } from "@/common/constant/api";
import { DRUG_GROUPS, normalizeCategories } from "./normalizeDrugs";

// Dipakai halaman daftar kategori/golongan dan halaman [slug]-nya. URL + opsi
// fetch-nya sama, jadi dalam satu render pass (generateMetadata + Page) Next
// memoize request ini — API-nya hanya dipanggil sekali.
async function getDrugGroups(kind) {
  try {
    const res = await fetch(`${CM_API_BASE}/${DRUG_GROUPS[kind].apiPath}/public/all`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return normalizeCategories(await res.json());
  } catch {
    return null;
  }
}

export const getDrugCategories = () => getDrugGroups("kategori");
export const getDrugClasses = () => getDrugGroups("golongan");
