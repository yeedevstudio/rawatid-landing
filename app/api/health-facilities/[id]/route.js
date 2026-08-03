import { NextResponse } from "next/server";
import { CM_API_BASE } from "@/common/constant/api";

// Master wilayah jarang berubah, jadi aman di-cache seharian.
const WILAYAH_REVALIDATE = 86400;

const rows = async (path) => {
  try {
    const res = await fetch(`${CM_API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: WILAYAH_REVALIDATE },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
};

// Faskes menyimpan provinceCode "73" dan cityCode "7315", sedangkan master
// wilayah memakai format bertitik ("73", "73.15"). Kecamatan & kelurahan tidak
// ikut di-resolve: districtCode pakai penomoran BPS 7 digit (mis. 1671041) yang
// tidak sepadan dengan kode Kemendagri di master (16.71.xx), dan villageCode
// tidak cocok dengan id mana pun di /villages.
const dotted = (code) => {
  const digits = String(code ?? "").replace(/\D/g, "");
  return digits.length === 4 ? `${digits.slice(0, 2)}.${digits.slice(2)}` : digits;
};

const pick = (list, code, id) => {
  const target = dotted(code);
  const byCode = target && list.find((x) => dotted(x.code) === target);
  if (byCode) return byCode.name;
  const byId = id != null && list.find((x) => String(x.id) === String(id));
  return byId ? byId.name : "";
};

const withWilayah = async (facility) => {
  const provinceCode = dotted(facility.provinceCode);
  if (!provinceCode) return facility;

  const [provinces, cities] = await Promise.all([
    rows("/provinces/all"),
    rows(`/cities/province/${encodeURIComponent(provinceCode)}`),
  ]);

  return {
    ...facility,
    provinceName: pick(provinces, facility.provinceCode, facility.provinceId),
    cityName: pick(cities, facility.cityCode, facility.cityId),
  };
};

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const res = await fetch(`${CM_API_BASE}/health-facilities/public/${encodeURIComponent(id)}`, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    let data;
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { message: text || "Terjadi kesalahan pada server." };
    }

    if (res.ok && data?.data) {
      data = { ...data, data: await withWilayah(data.data) };
    }

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
