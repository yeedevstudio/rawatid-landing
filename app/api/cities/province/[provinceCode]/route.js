import { NextResponse } from "next/server";
import { proxyCmApi } from "@/lib/proxyCmApi";

// Kab/Kota per provinsi, dipakai dropdown filter saat Provinsi dipilih.
// provinceCode di master wilayah selalu numerik ("11", "51"), jadi karakter lain
// ditolak di sini ketimbang diteruskan ke upstream.
export async function GET(_req, { params }) {
  const { provinceCode } = await params;
  const code = String(provinceCode ?? "").replace(/\D/g, "");
  if (!code) {
    return NextResponse.json({ message: "provinceCode tidak valid." }, { status: 400 });
  }
  return proxyCmApi(`/cities/province/${code}`);
}
