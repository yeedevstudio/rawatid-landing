import { NextResponse } from "next/server";

/**
 * Public proxy (tanpa /api) ke CM API /menu-categories/all
 */
export async function GET() {
  try {
    const res = await fetch("https://cm-api.rawat.id/menu-categories/public/all", {
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
      return NextResponse.json(
        { error: data?.error || "Failed to fetch menu categories", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch menu categories" },
      { status: 500 }
    );
  }
}

