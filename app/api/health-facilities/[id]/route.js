import { NextResponse } from "next/server";
import { CM_API_BASE } from "@/common/constant/api";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const res = await fetch(`${CM_API_BASE}/health-facilities/${encodeURIComponent(id)}`, {
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

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
