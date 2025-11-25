import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { regencyId } = params;

  try {
    const res = await fetch(`https://cm-api.rawat.id/districts/city/${regencyId}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch districts" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch districts" }, { status: 500 });
  }
}
