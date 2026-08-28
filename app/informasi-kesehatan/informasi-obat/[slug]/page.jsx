import DrugDetailClient from "./DrugDetailClient";

const CM_API = "https://cm-api.rawat.id";
const REVALIDATE = 3600;

const getJson = async (url) => {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const getDetail = (slug) =>
  getJson(`${CM_API}/drug-ingredients/public/slug/${encodeURIComponent(slug)}`);

// Rantai ini sebelumnya dijalankan browser setelah hydrate: fetch detail dulu,
// baru dari ing_code-nya fetch drugs + related. Dua round-trip beruntun di atas
// waktu unduh + hydrate JS. Sekarang server yang mengerjakannya, jadi halaman
// sampai ke HP dalam keadaan sudah terisi.
async function getInitialData(slug) {
  const detailJson = await getDetail(slug);
  const detail = detailJson?.data || detailJson;
  if (!detail) return null;

  const ingCode = String(
    detail?.ing_code ??
      detail?.ingCode ??
      detail?.ingredient_code ??
      detail?.ingredientCode ??
      detail?.code ??
      detail?.Code ??
      ""
  ).trim();

  const navigasi =
    detail?.navigasi ||
    (detail?.name ? String(detail.name).slice(0, 1).toUpperCase() : "");

  const relatedParams = new URLSearchParams({
    page: "1",
    perPage: "8",
    search: "",
  });
  if (navigasi) relatedParams.set("navigasi", String(navigasi));

  const [drugsJson, relatedJson] = await Promise.all([
    ingCode
      ? getJson(`${CM_API}/drugs/public?ing_code=${encodeURIComponent(ingCode)}`)
      : Promise.resolve(null),
    getJson(`${CM_API}/drug-ingredients/public?${relatedParams.toString()}`),
  ]);

  const drugsRaw = Array.isArray(drugsJson) ? drugsJson : drugsJson?.data ?? [];
  const relatedRaw = Array.isArray(relatedJson?.data) ? relatedJson.data : [];

  // Semua data di halaman ini dikirim sebagai props ke komponen client, jadi
  // ikut diserialisasi ke payload RSC — artinya terkirim DUA KALI: sekali
  // sebagai HTML, sekali sebagai flight data. Pada halaman detail obat payload
  // RSC-nya mencapai 77 KB dari total 120 KB HTML.
  //
  // Endpoint "obat lainnya" mengembalikan 42,8 KB untuk 8 item lengkap dengan
  // description, medicinal_uses, overdose, drug_side_effects, dan images —
  // padahal daftar itu hanya merender nama dan tautannya.
  const slimRelated = (it) => ({ slug: it?.slug, name: it?.name });

  // Tabel produk hanya memakai kolom di bawah ini; formatDrugStrength()
  // membutuhkan keempat field ing_*.
  const slimDrug = (d) => ({
    id: d?.id ?? d?._id ?? null,
    product_name: d?.product_name ?? d?.name ?? d?.product ?? null,
    ing_name: d?.ing_name ?? d?.active_ingredient ?? d?.active ?? null,
    form_name: d?.form_name ?? d?.dosage_form ?? d?.form ?? null,
    ing_num: d?.ing_num ?? null,
    ing_num_unit: d?.ing_num_unit ?? null,
    ing_denom: d?.ing_denom ?? null,
    ing_denom_unit: d?.ing_denom_unit ?? null,
  });

  return {
    detail,
    drugs: (Array.isArray(drugsRaw) ? drugsRaw : []).map(slimDrug),
    related: relatedRaw
      .filter((it) => it?.slug && it.slug !== detail?.slug)
      .slice(0, 6)
      .map(slimRelated),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // URL-nya identik dengan getDetail() yang dipanggil Page, jadi Next memoize
  // keduanya dalam satu render pass — bukan request kedua ke API.
  const data = await getDetail(slug);
  const name = data?.data?.name || data?.name || slug;
  return {
    title: `${name} - Manfaat, Cara Penggunaan dan Efek Samping`,
    alternates: {
      canonical: `https://www.rawat.id/informasi-kesehatan/informasi-obat/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const initialData = await getInitialData(slug);
  return <DrugDetailClient slug={slug} initialData={initialData} />;
}
