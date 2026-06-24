import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch(`${process.env.CM_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
