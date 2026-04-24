import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const qs = url.search ? url.search : "";

    const res = await fetch(`https://cm-api.rawat.id/drug-ingredients/public${qs}`);

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch drug ingredients", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch drug ingredients" },
      { status: 500 }
    );
  }
}

