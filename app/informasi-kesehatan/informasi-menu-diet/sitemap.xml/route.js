import { NextResponse } from "next/server";

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

async function fetchAllMenuNutritionSlugs() {
  const res = await fetch("https://cm-api.rawat.id/menu-nutritions/public/sitemap", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal memuat sitemap menu diet");
  }

  const json = await res.json().catch(() => null);
  const items = Array.isArray(json?.data) ? json.data : [];

  return items
    .map((item) => ({
      slug: item?.slug ? String(item.slug) : "",
      updatedAt: item?.updatedAt || null,
    }))
    .filter((it) => Boolean(it.slug));
}

export async function GET() {
  try {
    const baseUrl = "https://www.rawat.id";
    const items = await fetchAllMenuNutritionSlugs();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map((it) => {
    const loc = `${baseUrl}/informasi-kesehatan/informasi-menu-diet/${encodeURIComponent(it.slug)}`;
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
}

