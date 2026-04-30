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

async function fetchAllDrugIngredientSlugs() {
  const perPage = 200;
  let page = 1;
  let totalPages = 1;
  const out = [];

  while (page <= totalPages) {
    const qs = new URLSearchParams();
    qs.set("page", String(page));
    qs.set("perPage", String(perPage));

    const res = await fetch(
      `https://cm-api.rawat.id/drug-ingredients/public?${qs.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Gagal memuat daftar obat (page ${page})`);
    }

    const json = await res.json().catch(() => null);
    const data = Array.isArray(json) ? json : json?.data ?? [];
    const items = Array.isArray(data) ? data : [];

    totalPages = Number(json?.totalPages) || totalPages || 1;

    for (const item of items) {
      const slug = item?.slug ?? item?.Slug ?? null;
      if (!slug) continue;
      out.push({
        slug: String(slug),
        updatedAt: item?.updatedAt || item?.updated_at || item?.updated || null,
      });
    }

    // Fallback: stop if API doesn't provide totalPages and returns less than perPage.
    if (!json?.totalPages && items.length < perPage) break;

    page += 1;
  }

  // Deduplicate by slug (keep latest updatedAt if present).
  const map = new Map();
  for (const it of out) {
    const prev = map.get(it.slug);
    if (!prev) {
      map.set(it.slug, it);
      continue;
    }
    const prevTime = prev.updatedAt ? new Date(prev.updatedAt).getTime() : 0;
    const nextTime = it.updatedAt ? new Date(it.updatedAt).getTime() : 0;
    if (nextTime > prevTime) map.set(it.slug, it);
  }

  return Array.from(map.values());
}

export async function GET() {
  try {
    const baseUrl = "https://www.rawat.id";
    const items = await fetchAllDrugIngredientSlugs();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map((it) => {
    const loc = `${baseUrl}/informasi-kesehatan/informasi-obat/${encodeURIComponent(it.slug)}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(toIso(it.updatedAt))}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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

