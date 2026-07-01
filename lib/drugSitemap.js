import { NextResponse } from "next/server";

const BASE_URL = "https://www.rawat.id";
const DRUG_PATH = "/informasi-kesehatan/informasi-obat";
const SITEMAP_SOURCE =
  "https://cm-api.rawat.id/drug-ingredients/public/sitemap";

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIso(value) {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function emptySitemapResponse() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function fetchAllDrugIngredients() {
  const res = await fetch(SITEMAP_SOURCE, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Gagal memuat sitemap obat");
  }

  const json = await res.json().catch(() => null);
  const items = Array.isArray(json?.data) ? json.data : [];

  return items
    .map((item) => ({
      slug: item?.slug ? String(item.slug) : "",
      name: item?.name ? String(item.name) : "",
      updatedAt: item?.updatedAt || null,
    }))
    .filter((it) => Boolean(it.slug));
}

/**
 * Bangun sitemap XML berisi obat yang namanya diawali huruf tertentu.
 * Dipakai oleh route sitemap-[huruf].xml agar bertambah otomatis ketika
 * ada obat baru pada huruf tersebut.
 */
export async function buildDrugSitemapByLetter(letter) {
  const target = String(letter || "").trim().toLowerCase();

  try {
    const items = await fetchAllDrugIngredients();
    const filtered = items.filter((it) => {
      const first = (it.name || it.slug).trim().charAt(0).toLowerCase();
      return first === target;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filtered
  .map((it) => {
    const loc = `${BASE_URL}${DRUG_PATH}/${encodeURIComponent(it.slug)}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(toIso(it.updatedAt))}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return emptySitemapResponse();
  }
}
