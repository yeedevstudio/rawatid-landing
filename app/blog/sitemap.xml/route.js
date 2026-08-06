import { NextResponse } from "next/server";
import { SITEMAP_REVALIDATE } from "@/common/constant/revalidate";

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

/**
 * Ambil semua post blog dari CMS (Strapi) dengan mengikuti paginasi,
 * supaya sitemap selalu berisi seluruh artikel yang sudah dipublikasi
 * dan bertambah otomatis ketika ada artikel baru.
 */
async function fetchAllBlogPosts() {
  if (!process.env.API_URL) {
    throw new Error("API URL tidak didefinisikan");
  }

  const pageSize = 100;
  let page = 1;
  let pageCount = 1;
  const posts = [];

  do {
    const res = await fetch(
      `${process.env.API_URL}/posts?fields[0]=slug&fields[1]=updatedAt&sort=updatedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { next: { revalidate: SITEMAP_REVALIDATE } }
    );

    if (!res.ok) {
      throw new Error("Gagal memuat sitemap blog");
    }

    const json = await res.json().catch(() => null);
    const items = Array.isArray(json?.data) ? json.data : [];

    for (const item of items) {
      if (item?.slug) {
        posts.push({
          slug: String(item.slug),
          updatedAt: item?.updatedAt || null,
        });
      }
    }

    pageCount = Number(json?.meta?.pagination?.pageCount) || 1;
    page += 1;
  } while (page <= pageCount);

  return posts;
}

export async function GET() {
  try {
    const baseUrl = "https://www.rawat.id";
    const items = await fetchAllBlogPosts();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map((it) => {
    const loc = `${baseUrl}/blog/detail/${encodeURIComponent(it.slug)}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(toIso(it.updatedAt))}</lastmod>
    <changefreq>daily</changefreq>
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
