"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

// aos.css memberi `opacity: 0` ke setiap elemen [data-aos^="fade"]. Artinya
// konten ber-data-aos TIDAK TERLIHAT sampai AOS.init() dijalankan.
//
// Versi sebelumnya menunggu event `window load` (yang baru menyala setelah
// seluruh gambar dan script pihak ketiga selesai) lalu requestIdleCallback
// dengan timeout 2 detik. Di HP itu berarti konten bisa tersembunyi 4-5 detik,
// dan LCP ikut tertunda selama itu.
//
// Sekarang AOS diinisialisasi secepat mungkin setelah mount. Elemen di atas
// lipatan (hero) sudah tidak lagi memakai data-aos, jadi tidak bergantung sama
// sekali pada AOS.
export default function AOSProvider({ children }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { default: AOS } = await import("aos");
        if (cancelled) return;
        AOS.init({ duration: 600, once: true, offset: 40 });
      } catch {
        // Jaring pengaman: kalau AOS gagal dimuat, jangan biarkan konten
        // terkunci di opacity 0 selamanya.
        document
          .querySelectorAll("[data-aos]")
          .forEach((el) => el.setAttribute("data-aos", ""));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <main className="transition-all duration-200">{children}</main>;
}
