import { NextResponse } from "next/server";
import { CM_API_BASE } from "@/common/constant/api";

/**
 * Proxy ke CM API /drug-classes/public (golongan obat dengan paginasi).
 * Query ?page=&perPage= diteruskan apa adanya.
 */
export async function GET(req) {
  try {
    const { search } = new URL(req.url);
    const res = await fetch(`${CM_API_BASE}/drug-classes/public${search}`, { cache: "no-store" });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch drug classes", details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to fetch drug classes" }, { status: 500 });
  }
}
