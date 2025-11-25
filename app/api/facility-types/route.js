import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cm-api.rawat.id/facility-types/all");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch facility types" }, { status: 500 });
  }
}
