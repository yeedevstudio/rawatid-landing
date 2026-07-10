import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch(`http://dev.cm-api.rawat.id/auth/refresh-token`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
