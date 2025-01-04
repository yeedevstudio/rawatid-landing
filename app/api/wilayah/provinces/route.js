import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
  const provinces = await res.json();
  return NextResponse.json(provinces);
}
