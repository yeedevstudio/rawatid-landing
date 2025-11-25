import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { provinceId } = params;

  try {
    const res = await fetch(`https://cm-api.rawat.id/cities/province/${provinceId}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch regencies" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch regencies" }, { status: 500 });
  }
}
