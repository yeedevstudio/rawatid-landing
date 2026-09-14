import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cm-api.rawat.id/drug-categories/public/all");

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch drug categories", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch drug categories" },
      { status: 500 }
    );
  }
}
