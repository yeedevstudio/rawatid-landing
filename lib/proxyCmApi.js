import { NextResponse } from "next/server";
import { CM_API_BASE } from "@/common/constant/api";

// Proxy tipis untuk master data yang dipakai dropdown filter.
//
// Master ini dipanggil dari browser (bukan dari server seperti dataset faskes)
// supaya request-nya terlihat di tab Network dan mudah ditelusuri saat debug.
// Tetap lewat route kita sendiri, bukan langsung ke cm-api, karena: same-origin
// (tidak perlu CORS), CM_API_BASE tidak ikut terekspos ke bundle client, dan
// responsnya bisa ditahan di cache server.
//
// Sengaja tanpa header Cache-Control: cache ada di sisi server (revalidate), jadi
// browser selalu benar-benar mengirim request — itu yang bikin endpoint-nya
// kelihatan di Network — tapi ongkosnya tetap murah.
export async function proxyCmApi(path, revalidate = 86400) {
  try {
    const res = await fetch(`${CM_API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate },
    });

    const contentType = res.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : { message: (await res.text()) || "Terjadi kesalahan pada server." };

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
