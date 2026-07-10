import { NextResponse } from "next/server";

const BASE = "http://dev.cm-api.rawat.id";

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const authorization = req.headers.get("authorization");
    // Forward the raw multipart body untouched so the boundary + file field
    // stay intact; the client owns the FormData field name.
    const contentType = req.headers.get("content-type") || "";
    const body = await req.arrayBuffer();

    const res = await fetch(`${BASE}/users/${id}/profile-image`, {
      method: "POST",
      headers: {
        ...(authorization ? { Authorization: authorization } : {}),
        ...(contentType ? { "Content-Type": contentType } : {}),
      },
      body,
    });

    let data;
    const resType = res.headers.get("content-type") ?? "";
    if (resType.includes("application/json")) {
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
