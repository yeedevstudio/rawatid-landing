import DrugDetailClient from "./DrugDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`https://cm-api.rawat.id/drug-ingredients/public/slug/${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    const json = await res.json().catch(() => null);
    const name = json?.data?.name || json?.name || slug;
    return {
      title: `Manfaat, Cara Penggunaan, Dosis Obat dan Efek Samping dari Obat ${name}`,
      alternates: {
        canonical: `https://www.rawat.id/informasi-kesehatan/informasi-obat/${slug}`,
      },
    };
  } catch {
    return {
      title: `Manfaat, Cara Penggunaan, Dosis Obat dan Efek Samping dari Obat ${slug}`,
    };
  }
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams =
    searchParams && typeof searchParams.then === "function"
      ? await searchParams
      : searchParams;
  const ing_code = resolvedSearchParams?.ing_code || resolvedSearchParams?.ingCode || "";
  return <DrugDetailClient slug={slug} ing_code={ing_code} />;
}
