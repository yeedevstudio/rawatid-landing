import DrugDetailClient from "./DrugDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`https://cm-api.rawat.id/drug-ingredients/public/slug/${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    const json = await res.json().catch(() => null);
    const name = json?.data?.name || json?.name || slug;
    return {
      title: `${name} - Manfaat, Cara Penggunaan, Dosis dan Efek Samping`,
      alternates: {
        canonical: `https://www.rawat.id/informasi-kesehatan/informasi-obat/${slug}`,
      },
    };
  } catch {
    return {
      title: `${slug} - Manfaat, Cara Penggunaan, Dosis dan Efek Samping`,
    };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <DrugDetailClient slug={slug} />;
}
