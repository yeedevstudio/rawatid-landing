import { NextResponse } from "next/server";
import { proxyCmApi } from "@/lib/proxyCmApi";

// Kecamatan per kab/kota, dipakai dropdown filter saat Kab/Kota dipilih.
// Upstream menuntut kode bertitik ("11.11"); bentuk tanpa titik dibalas 0 baris,
// jadi digit yang masuk dinormalkan dulu ke bentuk bertitik.
export async function GET(_req, { params }) {
  const { cityCode } = await params;
  const d = String(cityCode ?? "").replace(/\D/g, "");
  if (d.length !== 4) {
    return NextResponse.json({ message: "cityCode tidak valid." }, { status: 400 });
  }
  return proxyCmApi(`/districts/city/${d.slice(0, 2)}.${d.slice(2)}`);
}
