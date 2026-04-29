import { NextResponse } from "next/server";

/**
 * Proxy ke CM API /basic-ingredients/public/all
 * Dibuat di folder `app/api` agar request dari client konsisten ke /api
 */
export async function GET() {
  try {
    const res = await fetch("https://cm-api.rawat.id/basic-ingredients/public/all", { cache: "no-store" });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch basic ingredients", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to fetch basic ingredients" }, { status: 500 });
  }
}

