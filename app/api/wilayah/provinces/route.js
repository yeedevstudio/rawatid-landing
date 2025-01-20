import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.API_URL_RAWAT}/provinces.json`);
  const provinces = await res.json();
  return NextResponse.json(provinces);
}
