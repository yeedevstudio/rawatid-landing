"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Skrip pihak ketiga adalah penyebab utama LCP tinggi di mobile.
// Pengukuran produksi (Lighthouse mobile, metode simulasi seperti PageSpeed):
//
//   Google/Doubleclick Ads   302,0 KB   main-thread 214 ms
//   Google FundingChoices     78,0 KB   main-thread 142 ms
//   Hotjar                    63,2 KB   main-thread 171 ms
//   Google Tag Manager       166,8 KB   main-thread 132 ms
//   ------------------------------------------------------
//   TOTAL                    650,4 KB   main-thread 695 ms
//
// Gambar hero sendiri sudah cepat (Load Time 0-394 ms), tetapi fase Render Delay
// mencapai 2.625-3.323 ms: berkasnya sudah ada, main thread-nya yang tidak sempat
// mengecat. `strategy="lazyOnload"` tidak cukup karena window load menyala lebih
// dulu daripada LCP, sehingga skrip-skrip ini tetap merebut main thread persis di
// jendela waktu yang menentukan.
//
// Komponen ini menunda pemuatannya sampai salah satu terjadi lebih dulu:
//   1. pengguna berinteraksi (sentuh, klik, gulir, tekan tombol), atau
//   2. IDLE_TIMEOUT_MS terlampaui.
//
// KOMPROMI YANG PERLU DISADARI:
// - Iklan AdSense tampil lebih lambat pada kunjungan yang tidak ada interaksi.
// - Sesi sangat singkat (pengguna menutup halaman sebelum timeout dan tanpa
//   interaksi apa pun) tidak akan tercatat di GA maupun Hotjar.
// Kalau dampaknya ke pendapatan iklan atau analitik dinilai terlalu besar,
// naikkan/turunkan IDLE_TIMEOUT_MS, atau kembalikan skrip ke app/layout.js.
const IDLE_TIMEOUT_MS = 3500;

const EVENTS = ["pointerdown", "keydown", "touchstart", "scroll", "wheel"];

export default function DeferredThirdParty({ gaId, hotjarId, adsenseClient }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let timer;
    const start = () => {
      cleanup();
      setReady(true);
    };
    const cleanup = () => {
      clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, start));
    };

    EVENTS.forEach((e) =>
      window.addEventListener(e, start, { once: true, passive: true })
    );
    timer = setTimeout(start, IDLE_TIMEOUT_MS);

    return cleanup;
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      {hotjarId ? (
        <Script id="hotjar" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${hotjarId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });`}
          </Script>
        </>
      ) : null}

      {adsenseClient ? (
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
