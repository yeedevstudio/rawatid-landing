import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { districtId } = params;

  const res = await fetch(
    `${process.env.API_URL_RAWAT}/villages/${districtId}.json`
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
