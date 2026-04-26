import { NextResponse } from "next/server";

/**
 * Proxy ke CMS posts endpoint, supaya bisa di-fetch dari client
 * dan terlihat di Network browser.
 *
 * Query yang didukung (opsional):
 * - categorySlug: slug kategori (filters[category][slug][$eq])
 * - page: pagination[page]
 * - pageSize: pagination[pageSize]
 * - sort: default updatedAt:desc
 * - populate: default *
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const qs = new URLSearchParams(url.searchParams);

    const categorySlug = qs.get("categorySlug") || qs.get("category_slug") || "";
    const page = qs.get("page") || "1";
    const pageSize = qs.get("pageSize") || qs.get("page_size") || "10";
    const sort = qs.get("sort") || "updatedAt:desc";
    const populate = qs.get("populate") || "*";

    qs.delete("categorySlug");
    qs.delete("category_slug");
    qs.delete("page");
    qs.delete("pageSize");
    qs.delete("page_size");
    qs.delete("kind");
    qs.delete("_");

    // Set standar Strapi-like query.
    qs.set("populate", populate);
    qs.set("sort", sort);
    qs.set("pagination[page]", String(page));
    qs.set("pagination[pageSize]", String(pageSize));
    if (categorySlug) qs.set("filters[category][slug][$eq]", categorySlug);

    if (!process.env.API_URL) {
      return NextResponse.json({ error: "API URL is not defined" }, { status: 500 });
    }

    const res = await fetch(`${process.env.API_URL}/posts?${qs.toString()}`, { cache: "no-store" });
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json({ error: data?.error || "Failed to fetch posts", details: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
