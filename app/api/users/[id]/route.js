import { NextResponse } from "next/server";

import { CM_API_BASE as BASE } from "@/common/constant/api";

async function readJson(res) {
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return res.json();
  const text = await res.text();
  return { message: text || "Terjadi kesalahan pada server." };
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const authorization = req.headers.get("authorization");
    const res = await fetch(`${BASE}/users/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
    });
    const data = await readJson(res);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const authorization = req.headers.get("authorization");
    const body = await req.json();
    const res = await fetch(`${BASE}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await readJson(res);
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
