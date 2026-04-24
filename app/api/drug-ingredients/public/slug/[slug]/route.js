import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  try {
    const { slug } = params || {};
    const encoded = encodeURIComponent(String(slug || ""));

    const res = await fetch(
      `https://cm-api.rawat.id/drug-ingredients/public/slug/${encoded}`
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
        { error: data?.error || "Failed to fetch drug ingredient", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch drug ingredient" },
      { status: 500 }
    );
  }
}

