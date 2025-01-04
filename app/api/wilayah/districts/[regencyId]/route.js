import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { regencyId } = params;

  const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch districts" }, { status: 500 });
  }

  const districts = await res.json();
  return NextResponse.json(districts);
}
