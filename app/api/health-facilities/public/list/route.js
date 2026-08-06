import { NextResponse } from "next/server";
import { getFacilities, FILTER_KEYS, PAGE_SIZE } from "@/lib/healthFacilities";

// Dipakai client saat user ganti halaman / cari / ubah filter. Render pertama
// tidak lewat sini — page.jsx memanggil getFacilities() langsung di server,
// jadi tidak ada hop HTTP tambahan.
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {};
    for (const key of FILTER_KEYS) {
      const value = searchParams.get(key);
      if (value) filters[key] = value;
    }

    const result = await getFacilities({
      page: Number(searchParams.get("page")) || 1,
      perPage: Number(searchParams.get("perPage")) || PAGE_SIZE,
      search: searchParams.get("search") || "",
      filters,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Gagal memuat data fasilitas." },
      { status: 500 }
    );
  }
}
