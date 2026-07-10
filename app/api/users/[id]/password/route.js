import { NextResponse } from "next/server";

const BASE = "http://dev.cm-api.rawat.id";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const authorization = req.headers.get("authorization");
    const body = await req.json();
    const res = await fetch(`${BASE}/users/${id}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
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
