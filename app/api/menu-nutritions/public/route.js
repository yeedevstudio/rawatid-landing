import { NextResponse } from "next/server";

/**
 * Proxy ke CM API menu-nutritions/public.
 * Tujuan: bisa di-fetch dari client agar terlihat di Network browser.
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const qs = new URLSearchParams(url.searchParams);
    const queryString = qs.toString();

    const res = await fetch(`https://cm-api.rawat.id/menu-nutritions/public${queryString ? `?${queryString}` : ""}`, {
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
      return NextResponse.json({ error: data?.error || "Failed to fetch menu nutritions", details: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu nutritions" }, { status: 500 });
  }
}

