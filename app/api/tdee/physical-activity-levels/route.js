import { NextResponse } from "next/server";
import { CM_API_BASE } from "@/common/constant/api";

/**
 * Proxy ke CM API /tdee/physical-activity-levels (opsi Tingkat Aktivitas
 * di Kalkulator TDEE). Di-fetch dari client supaya terlihat di tab Network.
 */
export async function GET() {
  try {
    const res = await fetch(`${CM_API_BASE}/tdee/physical-activity-levels`, { cache: "no-store" });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch physical activity levels", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to fetch physical activity levels" }, { status: 500 });
  }
}
