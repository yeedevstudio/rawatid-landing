import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { districtId } = params;

  try {
    const res = await fetch(`https://cm-api.rawat.id/villages/district/${districtId}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch villages" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch villages" }, { status: 500 });
  }
}
