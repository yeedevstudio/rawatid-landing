import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { districtId } = params;

  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch villages" },
      { status: 500 }
    );
  }

  const villages = await res.json();
  return NextResponse.json(villages);
}
