import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { provinceId } = params;

  const res = await fetch(`${process.env.API_URL_RAWAT}/regencies/${provinceId}.json`);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch regencies" }, { status: 500 });
  }

  const regencies = await res.json();
  return NextResponse.json(regencies);
}
