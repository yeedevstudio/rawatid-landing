import { NextResponse } from "next/server";

/**
 * Proxy to CM API drugs/public.
 *
 * Supports either:
 * - pass-through query string (if caller sends `filters[...]` etc), or
 * - `?ing_code=XXX` which will be converted to `filters[ing_code][$eq]=XXX`.
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const qs = new URLSearchParams(url.searchParams);

    // Convenience: allow `ing_code` and convert to filters format if filters are absent.
    const ingCode = qs.get("ing_code") || qs.get("ingCode");
    const hasFilters = Array.from(qs.keys()).some((k) => k.startsWith("filters["));
    if (ingCode && !hasFilters) {
      qs.delete("ing_code");
      qs.delete("ingCode");
      qs.set("filters[ing_code][$eq]", ingCode);
    }

    const queryString = qs.toString();
    const res = await fetch(
      `https://cm-api.rawat.id/drugs/public${queryString ? `?${queryString}` : ""}`,
      { cache: "no-store" }
    );

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch drugs", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch drugs" }, { status: 500 });
  }
}

