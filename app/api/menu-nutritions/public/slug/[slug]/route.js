import { NextResponse } from "next/server";

/**
 * Proxy ke CM API menu-nutritions/public/slug/:slug.
 */
export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const url = new URL(req.url);
    const qs = new URLSearchParams(url.searchParams);
    const queryString = qs.toString();

    const res = await fetch(`https://cm-api.rawat.id/menu-nutritions/public/slug/${encodeURIComponent(slug)}${queryString ? `?${queryString}` : ""}`, {
      cache: "no-store",
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json({ error: data?.error || "Failed to fetch menu nutrition detail", details: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu nutrition detail" }, { status: 500 });
  }
}

