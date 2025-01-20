import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { regencyId } = params;

  const res = await fetch(
    `${process.env.API_URL_RAWAT}/districts/${regencyId}.json`
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 }
    );
  }

  const districts = await res.json();
  return NextResponse.json(districts);
}
