import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const qs = url.search ? url.search : "";

    // Backward compatible proxy. Preferred path is `/api/drug-ingredients/public`.
    const res = await fetch(`https://cm-api.rawat.id/drug-ingredients/public${qs}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch drug ingredients" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch drug ingredients" },
      { status: 500 }
    );
  }
}

